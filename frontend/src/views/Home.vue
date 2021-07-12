<template>    
	<section id="home-section">
		<img :src="img.src" :alt="img.alt">
		<AppTitle text="Escape Moon"></AppTitle>
		<div>
			<p>
				En l'an 3077, le COVID-19 a décimé tous les habitants la terre. Les derniers survivants ont décidé d'établir des colonies sur la lune afin d'échapper au fléau qui a amené l'humanité au bord de l'extinction.
			</p>
			<p>
				Vous êtes un de ces survivants. Cela fait maintenant 3 ans que vous résidez dans la colonie LARAVEL-3. Malheureusement, cette dernière se retrouve pour une raison inconnue, infectée par le COVID-19 et vous devez impérativement y échapper.
			</p>
			<p>
				Arriverez-vous à résoudre ce mystère et a échapper au COVID-19 ?
			</p>
		</div>
		<router-link class="base-btn-filled" to="/saves">Jouer</router-link>

		<div v-if="loggedIn" id="trophies">
			<div class="trophy" v-for="(value, index) in trophies" :key="index">
				<img :src="trophy" alt="trophy"/>
				<label>{{value.name}}</label>
			</div>
		</div>

	</section>
</template>

<script>
// Components
import AppTitle from 'src/components/AppTitle'

// Images
import space_img from 'src/assets/icons/planets.svg'
import trophy from 'src/assets/icons/trophy.png'

export default {
	components: {
		AppTitle,
	},
	data() {
		return {
			img: {
				src: space_img,
				alt: "planets"
			},
			trophy: trophy,
		}
	},
	mounted() {
		if(this.loggedIn)
			this.fetchTrophies();
	},
	methods: {
		fetchTrophies() {
			this.$store.dispatch("fetchTrophies");
		},
	},
	computed: {
		loggedIn() {
			return this.$store.getters.loggedIn;
		},

		trophies() {
			return this.$store.state.trophies;
		}
	},
}
</script>

<style lang="scss">
@import "src/variables.scss";

#home-section {	
	img {
		height: 200px;
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 700px;
	}

	p {
		margin: 10px;
		text-align: justify;
		text-justify: inter-word;
		color: $white;
	}

	a {
		margin: 40px;
		font-size: 16px;
		letter-spacing: 1px;
		color: $white;
	}

	#trophies {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		width: 100%;
		
		.trophy {
			margin: 20px 10px;
			text-align: center;
			
			img {
				width: 170px;
				height: auto;
			}
			
			label {
				margin-top: 8px;
				max-width: 200px;
				color: $white;
				font-weight: bold;
				font-size: 14px;
			}
		}
	}
}

@media all and (max-width: 800px) {
	#home-section {		
		img {
			height: 150px;
		}

		p {
			font-size: 14px;
		}

		a {
			margin: 30px;
			font-size: 14px;
		}

		#trophies .trophy {
			margin: 10px 5px;
		
			img {
				width: 140px;
			}
			
			label {
				max-width: 170px;
			}
		}
	}
}

</style>