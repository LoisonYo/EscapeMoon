<template>
	<canvas id="game-cnvs" width="1920" height="1080" v-on:click="onSceneClick"></canvas>
</template>

<script>

export default {
	name: "TheGameScene",
	props: {
		scene: {
			type: String,
			required: true
		},
		light: {
			type: Boolean,
			default: true
		},
		dark: {
			type: Boolean,
			default: false
		}	
	},
	methods: {
		onSceneClick(e) {
			let c = document.getElementById("game-cnvs");
			let cRect = c.getBoundingClientRect();
			let x = ((e.clientX - cRect.left) / cRect.width);
			let y = ((e.clientY- cRect.top) / cRect.height);

			this.$store.dispatch("sceneClick", {
				positionX: x,
				positionY: y,
			});
		},
		drawScene(e) { 
			let c = document.getElementById("game-cnvs");
			let ctx = c.getContext("2d");
			
			let img = new Image();
			img.src = this.scene;
			img.addEventListener("load", () => draw(e), false);

			let light = this.light;
			let dark = this.dark;
			let black = "#0b1117";
			let grd = ctx.createLinearGradient(0, 800, 0, 1080);
			grd.addColorStop(0, "transparent");
			grd.addColorStop(1, black);
			
			function drawBackground() {
				ctx.drawImage(img, 0, 0, 1920, 1080);
				ctx.fillStyle = grd;
				ctx.fillRect(0, 800, 1920, 280);
			}
				
			function draw(e)
			{
				drawBackground();
				// Hide background depends on light
				if(dark)
				{
					ctx.fillStyle = black;
					ctx.fillRect(0, 0, 1920, 1080);

					if (light)
					{					
						if (e != undefined) {
							let cRect = c.getBoundingClientRect();
							let x = ((e.clientX - cRect.left) / cRect.width) * 1920;
							let y = ((e.clientY- cRect.top) / cRect.height) * 1080;
							let r = 150;
							
							// Clip circle
							ctx.save();
							ctx.beginPath()
							ctx.arc(x, y, r, 0, Math.PI*2, true);
							ctx.clip();
							drawBackground();
							ctx.restore();
						}
					}
				}
			}
		},
	},
	mounted() {
		this.drawScene();
		let c = document.getElementById("game-cnvs");
		c.addEventListener("mousemove", (e) => this.drawScene(e));
		c.addEventListener("mouseout", () => this.drawScene());
	},
	watch:{
		scene() {
			this.drawScene();
		},
		dark() {
			this.drawScene();
		}
	}
}
</script>

<style lang="scss">
@import "src/variables.scss";

#game-cnvs {
	width: 100%;
}

</style>