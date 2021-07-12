<template>
  <h1 class="app-title-h1">{{ text }}</h1>
</template>

<script>
export default {
	name: "AppTitle",
	props: {
		text: {
			type: String,
			required: true
		},
	}
}
</script>

<style lang="scss">
@import "src/variables.scss";

.app-title-h1 {
	font-size: 40px;
	color: $gold;
	margin: 40px 0;
}

@media all and (max-width: 800px) {
	.app-title-h1 {
		font-size: 30px;
		margin: 30px;
	}
}
</style>