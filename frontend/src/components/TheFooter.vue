<template>
	<footer>
		<!-- Light -->
		<div class="space_light-div"></div>
		
		<!-- Footer -->
		<p>À propos de Escape Moon</p>
		<p class="copyright-p">© 2020 Escape Inc. Tous droits réservés.</p>
	</footer> 
</template>

<script>
export default {
	name: "TheFooter",
}
</script>

<style lang="scss">
@import "src/variables.scss";

footer {
	/* Display & Box Model */
	display: flex;
	flex-direction: column;
	margin-top: auto;
	width: 100%;
	padding: 20px 0;
	/* Color */
	background: $black;

	.space_light-div {
		/* Display & Box Model */
		position: absolute;
		bottom: 0;
		z-index: -3;
		height: 500px;
		width: 100%;
		/* Color */
		background: radial-gradient(ellipse at bottom, #26374a 0%, $black 60%);
	}

	p {
		/* Display & Box Model */
		margin: 6px 0;
		width: 100%;
		/* Text */
		text-align: center;
		font-size: 0.7em;
		/* Color */
		color: white;
	}

	.copyright-p {
		/* Color */
		color: rgb(149, 149, 149);
	}
}

</style>