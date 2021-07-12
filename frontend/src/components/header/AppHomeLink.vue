<template>
	<router-link class="logo-a" to="/">
		<img :src="img.src" :alt="img.alt">
		<h1>Escape</h1>
	</router-link>
</template>

<script>
import escape_img from 'src/assets/icons/escape-icon.png'

export default {
	name: "AppHomeLink",
	data() {
		return {
			img: {
				src: escape_img,
				alt: "escape logo"
			},
		}
	},
}
</script>

<style lang="scss">
@import "src/variables.scss";

.logo-a {
	/* Display & Box Model */
	display: flex;
	z-index: 3;
	/* Text */
	text-decoration: none;

	img {
		/* Display & Box Model */
		margin: auto 5px;
		height: 30px;
	}

	h1 {
		/* Display & Box Model */
		display: flex;
		align-items: center;
		/* Color */
		color: $white;
		/* Text */
		font-size: 30px;
		font-weight: normal;
	}
}

</style>