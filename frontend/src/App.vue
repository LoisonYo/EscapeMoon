<template>
	<div class="app-div">
		<the-header></the-header> 

		<div class="stars"></div>
		<div class="stars2"></div>

		<router-view></router-view>
		
		<the-footer></the-footer>	
	</div>
</template>

<script>
import TheHeader from './components/header/TheHeader'
import TheFooter from './components/TheFooter'

export default {
	name: 'App',
	created() {
		if (this.loggedIn) {
			this.$store.dispatch("fetchAuthUser")
		}
	},
	components: {
		TheHeader,
		TheFooter,
	},
	computed: {
		loggedIn() {
			return this.$store.getters.loggedIn
		}
	},
};
</script>

<style lang="scss">
@import "src/variables.scss";
@import "src/utils.scss";

* {
	padding: 0;
	margin: 0;
	font-family: Arial;
}

.app-div { 
	display: flex;
	flex-direction: column;
	position: relative;
	min-height: 100vh;
}

body {	
	background-color: $black;

	&::-webkit-scrollbar {
		width: 10px;
		background-color: $black;
	}

	&::-webkit-scrollbar-thumb {
		background: #636363;
		border-radius: 10px;
	}
}

section {
	/* Display & Box Model */
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 95%;
	max-width: 1100px;
	margin: 40px auto;
	box-sizing: border-box;
}

/*-------------------------------------Star--------------------------------------*/

// Genrate box-shadow
@function multiple-box-shadow($n) {
	$value: "#{random(2000)}px #{random(2000)}px #FFF";
	@for $i from 2 through $n {
		$value: "#{$value} , #{random(2000)}px #{random(2000)}px #FFF";
	}
	@return unquote($value);
}

// Create stars
@mixin star($n: 200, $size: 1px, $speed: 100s) {
	position: absolute;
	top: 1000;
	left: 0;
	width: $size;
	height: $size;
	border-radius: 50%;
	z-index: -2;
	background: transparent;
	box-shadow: multiple-box-shadow($n);
	animation: animStar $speed linear infinite;
}

.stars {
	@include star(700, 1px, 150s);
}
.stars2 {
	@include star(300, 2px, 200s);
}

@keyframes animStar {
	from {
		transform: translateY(0px);
	}
	to {
		transform: translateY(-1000px);
	}
}

</style>