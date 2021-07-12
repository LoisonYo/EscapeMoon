<template>
	<div class="interface-div" >
		<!-- Timer -->
		<div class="time-div">{{ time }}</div>
		
		<!-- Buttons on the left -->
		<div class="actions-div">
			<button class="complex-btn-filled" v-bind:class="{ combining: isCombining }" v-on:click="toggleCombining">
				COMBINER
			</button> 
			<button class="complex-btn" v-on:click="$emit('rulesClick')">REGLES</button> 
		</div>

		<!-- Inventory -->
		<div class="inventory" :key="componentKey">
			<GameInventoryItem v-for="item in inventory" :key="item.item_id"
				ref="items"
				v-on:item-click="combine"
				:id="item.item_id"
				:img="getItemImage(item.item_id)"
				:draggable="isCombining"
			/>
		</div>
	</div>
</template>

<script>
// Components
import GameInventoryItem from 'src/components/game/GameInventoryItem'

// Images items
import default_item from "src/assets/items/default.jpg"
import screwdriver from "src/assets/items/screwdriver.jpg"
import flashlight_unpowered from "src/assets/items/flashlight_unpowered.jpg"
import flashlight from "src/assets/items/flashlight.jpg"
import radio from "src/assets/items/radio.jpg"
import battery from "src/assets/items/battery.jpg"
import access_card from "src/assets/items/access_card.jpg"
import key from "src/assets/items/key.jpg"

export default {
	name: "TheGameInterface",
	props: {
		inventory: {
			type: Array,
			required: true
		},
		timeInit: {
			type: Number,
			default: 0,
		},
	},
	components: {
		GameInventoryItem,
	},
	data() {
		return {
			time: "00:00",
			isCombining: false,
			firstItemId: null,
			componentKey: 0,
		}
	},
	methods: {
		forceRerender() {
			this.componentKey += 1;
		},
		toggleCombining() {
			this.isCombining = !this.isCombining;
			// Reset
			this.$refs.items.forEach(i => i.setSelected(false));
			this.firstItemId = null;
		},
		combine(item_id) {
			if (this.isCombining) {
				if (this.firstItemId == item_id) {
					this.$refs.items.forEach(i => i.setSelected(false));
					this.firstItemId = null;
				}
				else if (this.firstItemId == null) {
					this.$refs.items.forEach(function(i) {
						if (i.id == item_id)
							i.setSelected(true);
					});
					this.firstItemId = item_id;
				}
				else {
					this.craft(this.firstItemId, item_id);
					this.firstItemId = null;
					this.isCombining = false;
					this.$refs.items.forEach(i => i.setSelected(false));
				}
			}
		},
		craft(item_id1, item_id2) {
			this.$store.dispatch("craft", {
				first_item_id: item_id1,
				second_item_id: item_id2,
			})
			.then(() => {
				this.forceRerender();
			});
		},
		getItemImage(item_id) {
			switch(item_id) {
				case 1:
					return screwdriver;
				case 2:
					return key;
				case 3:
					return flashlight_unpowered;
				case 4:
					return flashlight;
				case 5:
					return radio;
				case 6:
					return battery;
				case 7:
					return access_card;
				default:
					return default_item;
			}
		},
	},
	mounted() {
		// Timer
		let _this = this;
		let init = new Date();
		init.setTime(init.getTime() - 1000 * this.timeInit);

		setInterval(function() {
			let now = new Date().getTime();
			let dt = now - init;
				
			let minutes = Math.floor((dt % (1000 * 3600)) / (1000 * 60));
			let seconds = Math.floor((dt % (1000 * 60)) / 1000);
				
			_this.time = pad(minutes) + ":" + pad(seconds);
		}, 1000);
		
		function pad(num) {
			let s = "0" + num;
			return s.substr(s.length - 2);
		}
	}
}
</script>

<style lang="scss">
@import "src/variables.scss";

.interface-div {
	/* Display & Box Model */
	display: flex;
	position: relative;
	top: calc(min(95vw, 1100px) * 0.5625 * -0.05); // 5% de la hauteur du canvas
	width: 90%;
	box-sizing: border-box;
	padding: 20px 15px;
	/* Color */
	$border: 2px solid rgba($white, 0.6);
	border-bottom: $border;

	&::after,
	&::before {
		/* Display & Box Model */
		content: "";
		position: absolute;
		top: -2px;
		width: calc(40% + 2px);
		height: calc(100% + 4px);
		box-sizing: border-box;
		/* Color */
		border: $border;
		border-bottom: 0;
		/* Other */
		pointer-events: none;
	}

	&::before {
		/* Display & Box Model */
		right: -2px;
		border-left: 0;
	}

	&::after {
		/* Display & Box Model */
		left: -2px;
		border-right: 0;
	}

	.time-div {
		/* Display & Box Model */
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		$width: 100px;
		width: $width;
		$height: 40px;
		height: $height;
		top: -$height / 2;
		left: calc(50% - #{$width / 2});
		/* Color */
		color: $white;
		/* Text */
		font-family: "Verdana";
		font-size: 30px;
		font-size: #{"min(4vw, 50px)"};
		font-weight: 800;
		letter-spacing: 0.03em;
	}
	
	.actions-div {
		/* Display & Box Model */
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 145px;
		height: 170px;
		margin-right: 10px;

		.complex-btn-filled {
			margin-bottom: 20px;
		}

		.combining {
			color: black;
			border: 1px solid $gold;
			background-color: $gold;
			&::after {
				border: 1px solid rgba(#ffd000, 0.5);
			}
		}
	}
	
	.inventory {
		/* Display & Box Model */
		display: flex;
		overflow-x: auto;
		padding: 5px;

		&::-webkit-scrollbar {
			height: 10px;
			background-color: transparent;
		}
		&::-webkit-scrollbar-thumb {
			background: #636363;
			border-radius: 10px;
		}
	}
}

@media all and (max-width: 800px) {
	
	.interface-div {
		flex-direction: column-reverse;
		align-items: center;

		.actions-div {
			flex-direction: row;
			width: 100%;
			height: auto;
			margin: 0;
			margin-top: 10px;
			
			.complex-btn-filled {
				margin-bottom: 7px;
				margin-right: 40px;
			}
		}

		.inventory {
			min-height: calc(123px);
			width: 100%;
		}
	}
}

@media all and (max-width: 500px) {
	.interface-div {
		padding: 10px 7px;

		.actions-div {
			flex-direction: row;
			width: 100%;
			height: auto;
			margin: 0;
			margin-top: 10px;
			
			button {
				font-size: 12px;
				padding: 5px 10px;
			}
			.complex-btn-filled {
				margin-bottom: 7px;
				margin-right: 20px;
			}
		}
		
		.inventory{
			min-height: calc(80px);
			&::-webkit-scrollbar {
				height: 5px;
			}
		}
	}
}


</style>