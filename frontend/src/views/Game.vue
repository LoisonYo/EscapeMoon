<template>
	<section>	
		<TheGameScene :dark="currentScene.dark == 1" :light="currentScene.flashlight == 1" :scene="scene_image_src" />
		<TheGameInterface :inventory="inventory" :timeInit="currentScene.time" v-on:rulesClick="showRules=!showRules"/>
		<Rules v-if="showRules"/>
	</section>
</template>

<script>
// Components
import TheGameScene from "src/components/game/TheGameScene"
import TheGameInterface from "src/components/game/TheGameInterface"
import Rules from "src/components/Rules"

// Scenes images
import default_scene from "src/assets/scenes/default.jpg"
import library from "src/assets/scenes/library.jpg"
import maintenance_room from "src/assets/scenes/maintenance_room.jpg"
import tool_cabinet from "src/assets/scenes/tool_cabinet.jpg"

export default {
	components: {
		TheGameScene,
		TheGameInterface,
		Rules,
	},
	data() {
		return {
			scene_image_src: default_scene,
			showRules: false,
		}
	},
	computed: {
		currentScene() {
			return this.$store.state.current_scene;
		},
		scenes() {
			return this.$store.state.scenes;
		},
		inventory() {
			return this.$store.state.inventory;
        },
        scenarioEnd() {
            return this.$store.state.scenarioEnd;
        }
	},
	methods: {
		getSceneImage(scene_id) {
			switch(scene_id) {
				case 1:
					return maintenance_room;
				case 2:
					return tool_cabinet;
				case 3:
					return library;
				default:
					return default_scene;
			}
		},
		fetchInventory() {
			this.$store.dispatch("fetchInventory");
		},
	},
	mounted() {
		if (this.currentScene == null)
			this.$router.push({name:"saves"})
		else {
			this.scene_image_src = this.getSceneImage(this.currentScene.scene_id);
			this.fetchInventory();
		}
	},
	watch: {
		currentScene() {
			this.scene_image_src = this.getSceneImage(this.currentScene.scene_id);
        },
        scenarioEnd() {
            if(this.scenarioEnd)
                this.$router.push({name:"end"})
        }
	},
}

</script>

<style>

</style>