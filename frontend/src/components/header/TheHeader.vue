<template>
	<header>
		<!-- Header's left part -->
		<div>		
			<the-navbar v-bind:links="[
				{ name: 'Menu principal', url: '/' },
				{ name: 'Tableau des scores', url: 'scoreboard' },
				{ name: 'Mes sauvegardes', url: 'saves' },
			]"></the-navbar> 
			<app-home-link id="home-link"></app-home-link>
		</div>

		<!-- Header's right part -->
		<div v-if="loggedIn">
			<button class="base-btn" @click="logout">Se Déconnecter</button>
		</div>
		<div v-else>
			<button class="base-btn-filled" @click="$router.push('login')">Connexion</button>
			<button class="base-btn" @click="$router.push('register')">S'inscrire</button>
		</div>
	</header>
</template>

<script>
import TheNavbar from './TheNavbar'
import AppHomeLink from './AppHomeLink'

export default {
	name: "TheHeader",
	components: {
		TheNavbar,
		AppHomeLink,
	},
	methods: {
		logout:function(){
			this.$store.dispatch("destroyToken")
			.then(()=>{
				this.$router.push({name:"login"})
			})
		}
	},
	computed: {
		loggedIn() {
			return this.$store.getters.loggedIn
		}
	}
}
</script>

<style lang="scss">
@import "src/variables.scss";

header {
	/* Display & Box Model */
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	height: 55px;
	box-sizing: border-box;
	/* Color */
	border-bottom: 1px solid rgba($white, 0.6);
	background-color: $black;
	
	div {
		/* Display & Box Model */
		display: flex;
		align-items: center;
	}
}

@media all and (max-width: 500px) {
	header {
		padding: 10px;
		#home-link {
			display: none;
		}
	}
}

</style>