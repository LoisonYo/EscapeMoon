<template>
	<div>
		<!-- Input for menu -->
		<input type="checkbox" id="open_menu-input">
		
		<label id="hamburger-lbl" for="open_menu-input">
			<span></span>
			<span></span>
			<span></span>
		</label>
		
		<!-- Menu navigation -->
		<nav class="menu-nav">
			<ul>
				<router-link v-for="link in links" :key="link.name" :to=" link.url "><li>{{ link.name }}</li></router-link>
			</ul>
		</nav>
		<div v-on:click="close" class=shadow-div></div>
	</div>
</template>

<script>
export default {
	name: "TheNavbar",
	props: {
		links: Array,
	},
	watch: {
		$route() {
			this.close();
		}
	},
	methods: {
		close() {
			document.getElementById("open_menu-input").checked  = false;
		},
	}
}
</script>

<style lang="scss">
@import "src/variables.scss";

/*--------------------Hamburger---------------------*/

#hamburger-lbl {
	/* Display & Box Model */
	margin: 0 15px;
	border: 0;
	/* Other */
	cursor: pointer;
	outline: none;

	span {
		/* Display & Box Model */
		display: block;
		position: relative;
		width: 32px;
		height: 3px;
		margin: 5px 0;
		border-radius: 3px;
		transform-origin: 50% 50%;
		transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), 
			background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), 
			opacity 0.5s ease;
		/* Color */
		background: $white;
	}
}

#open_menu-input {
	/* Display & Box Model */
	display: none;

	&:checked ~ nav {
		transform: none;
		visibility: visible;
		opacity: 1;
	}
	&:checked ~ .shadow-div {
		display: block;
	}
	&:checked ~ label span:first-child {
		transform: translate(0, 8px) rotate(45deg) scale(0.9, 1);
	}
	&:checked ~ label span:nth-child(2) {
		opacity: 0;
		transform: scale(0.2, 0.2);
	}
	&:checked ~ label span:last-child {
		transform: translate(0, -8px) rotate(-45deg) scale(0.9, 1);
	}
}

/*--------------------Menu navigation---------------------*/
$height: 54px;

.menu-nav {
	/* Display & Box Model */
	position: absolute;
	z-index: 3;
	top: $height;
	left: 0;
	width: 100%;
	height: $height;
	visibility: hidden;
	opacity: 0;
	transform-origin: 0% 0;
	transform: translate(0, -30px);
	transition: transform 0.3s, visibility 0.1s, opacity 0.1s linear;

	ul {
		/* Display & Box Model */
		display: flex;
		flex-direction: row;
		list-style-type: none;
		/* Color */
		background: $white;

		a {
			/* Color */
			color: $black;
			/* Text */
			text-decoration: none;

			&:first-child {
				&::after {
					/* Display & Box Model */
					content: "";
					z-index: -1;
					display: block;
					position: absolute;
					top: -5px;
					left: 42px;
					width: 30px;
					height: 30px;
					transform-origin: 50% 50%;
					transform: rotate(45deg);
					/* Color */
					background-color: $white;
				}

				&:hover {
					/* Color */
					color: $white;
					background-color: $purple;

					&::after {
						background-color: $purple;
					}
				}
			}
		}

		li {
			/* Display & Box Model */
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 15px;
			box-sizing: border-box;
			border: 5px solid transparent;

			&:hover {
				/* Color */
				color: $white;
				background-color: $purple; //#a0a2a3;
			}
		}
	}
}

.shadow-div {
	/* Display & Box Model */
	position: absolute;
	display: none;
	top: $height;
	left:0;
	width: 100%;
	height: calc(100% - #{$height});
	/* Color */
	background-color: rgba(0, 0, 0, 0.4);
}

@media all and (max-width: 500px) {
	#open_menu-input {
		&:checked ~ label span {
			background: black;
		}
	}

	#hamburger-lbl {
		z-index: 4;
	}

	.menu-nav {
		width: 250px;
		height: calc(100% - #{$height});
		top: 0;
		transform: translate(-30px, 0px);
		transition: transform 0.3s, visibility 0.1s, opacity 0.1s linear;

		ul {
			flex-direction: column;
			height: 100%;
			padding-top: $height;
			
			li {
				justify-content: flex-start;
				padding: 10px;
				padding-left: 25px;
			}
		}
	}

	.shadow-div {
		top: 0;
		height: 100%;
	}
}

</style>