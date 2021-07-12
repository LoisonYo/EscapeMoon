<template>
	<div v-bind:class="containerClassName"> 
		<div class="item" ref="item" 
			v-bind:class="{ selected: isSelected }"
			v-on:click="$emit('item-click', id)"
			v-bind:style="{ 'background-image': 'url(' + img + ')' }" 
			style="background-size: 100% 100%;"
			:alt="alt"/>
	</div>
</template>

<script>
// Class for dragable
import { Container } from 'src/container.js'

export default {
	name: "GameInventoryItem",
	props: {
		// Warning! this props must be used only for initialization.
		// Drag & drop will modify the content of a container but not the props...
		id: {
			type: Number,
			required: true
		},
		img: {
			type: String,
			required: true
		},
		alt: {
			type: String,
			default: "item"
		},
		draggable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			containerClassName: "containers",
			isSelected: false,
		}
	},
	methods: {
		setSelected(bool) {
			this.isSelected = bool;
		},
		getContainer() {
			return this;
		}
	},
	mounted() {
		let _this = this;
		let x = 0;
		let y = 0;
		let clone = null;
		let containers = [];
		let elmnt = this.$refs.item;

		if (elmnt != undefined) 
			elmnt.addEventListener("mousedown", openDragElement);		

		function getOverElement() {
			// Check if a point is over a container
			for (let i in containers) 
				if (containers[i].mouseOver)
					return i;
			return false;
		}
		
		function getContainer(element) {
			// Get container of an element
			for (let i in containers) 
				if (containers[i].content == element)
					return i;
			return false;
		}
		
		function openDragElement(e) {
			if (!_this.draggable) {
				e = e || window.event;

				// Create containers
				containers = [];
				let c = document.getElementsByClassName(_this.containerClassName);
				for (const element of c) 
					containers.push(new Container(element));

				// Create clone
				let style = getComputedStyle(elmnt);
				clone = elmnt.cloneNode(true);
				clone.style.position = "absolute";
				clone.style.margin = 0;

				// For css size %
				clone.style.height = style.getPropertyValue('height');
				clone.style.width = style.getPropertyValue('width');

				// Ignore mouse events
				clone.style.pointerEvents = "none";
				
				// Set position
				clone.style.left = elmnt.getBoundingClientRect().left + window.scrollX + "px";
				clone.style.top =  elmnt.getBoundingClientRect().top + window.scrollY + "px"; 
				
				document.body.appendChild(clone);
				
				// Change css property
				elmnt.style.opacity = 0;
				
				// Get mouse position
				x = e.clientX ;
				y = e.clientY ;
				
				// Add event listener
				document.addEventListener("mouseup", closeDragElement);
				document.addEventListener("mousemove", elementDrag);
			}
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();

			// Set the clone's new position
			clone.style.left = clone.offsetLeft - (x - e.clientX) + "px";
			clone.style.top = clone.offsetTop - (y - e.clientY) + "px";

			// Get mouse position
			x = e.clientX;
			y = e.clientY;
		}

		function closeDragElement() {		
			// Remove clone
			clone.remove();
			
			// Reset css 
			elmnt.style.opacity = 1;
			
			// Leave on a container if cursor is over
			let i = getOverElement();
			if (i) {
				let origin = containers[getContainer(elmnt)]
				origin.freeContent();
				let content = containers[i].setContent(elmnt);
				if (content)
					origin.setContent(content);
			}
			// Remove event listener
			document.removeEventListener("mouseup", closeDragElement);
			document.removeEventListener("mousemove", elementDrag);
		}
	}
}
</script>

<style lang="scss">
@import "src/variables.scss";

$ratio: 0.75;
.containers {
	/* Display & Box Model */
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	flex-shrink: 0;
	width: 200px;
	height: 200px * $ratio;

	.item {
		/* Display & Box Model */
		position: absolute;
		top: auto;
		left: auto;
		width: calc(100% - 25px);
		height: calc(100% - 25px);
	}

	$thikness: 32px;
	.selected::after {
		/* Display & Box Model */
		position: absolute;
		content: "";
		top: -$thikness / 2;
		left: -$thikness / 2;
		width: $thikness;
		height: $thikness;
		border-radius: 50%;
		/* Color */
		background: $gold;
		background-image: url('~src/assets/icons/first.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 75% 75%;
	}
}

@media all and (max-width: 800px) {

	.containers {
		width: 150px;
		height: 150px * $ratio;

		.item {
			width: calc(100% - 17.5px);
			height: calc(100% - 17.5px);
		}

		$thikness: 23px;
		.selected::after {
			/* Display & Box Model */
			position: absolute;
			content: "";
			top: -$thikness / 2;
			left: -$thikness / 2;
			width: $thikness;
			height: $thikness;
		}
	}
}

@media all and (max-width: 500px) {
	.containers {
		width: 100px;
		height: 100px * $ratio;

		.item {
			width: calc(100% - 15px);
			height: calc(100% - 15px);
		}

		$thikness: 17px;
		.selected::after {
			/* Display & Box Model */
			position: absolute;
			content: "";
			top: -$thikness / 2;
			left: -$thikness / 2;
			width: $thikness;
			height: $thikness;
		}
	}
}

</style>