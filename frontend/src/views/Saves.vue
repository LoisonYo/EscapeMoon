<template>
	<section id="saves-section">
		<AppTitle text="Créer une partie"></AppTitle>
		<form @submit.prevent="createSave">
			<!-- <div>
				<label>Scenario : </label>
				<select ref="scenarioSelect" v-model="scenario_id" name="scenario_id" required>
					<option 
						v-for="(value, index) in scenarios" 
						:key="index" :value="value.id">
						{{value.name}}
					</option>
				</select>
			</div> -->
			<input class="base-btn-filled" type="submit" value="Créer !"/>
		</form>

		<table v-if="saves.length">
			<tr>
				<th>Scenario</th>
				<th>Dernière sauvegarde</th>
				<th>Création</th>
				<th></th>
			</tr>
			<tr v-on:click="resumeSave(value.id)" v-for="(value, index) in saves" :key="index">
				<td>{{value.name}}</td>
				<td>{{value.last_save}}</td>
				<td>{{value.creation}}</td>
				<td><i v-on:click.stop="deleteSave(value.id)" class="fa fa-trash"></i></td>
			</tr>
		</table>
		<p v-else>Aucune partie sauvegardée...</p>

	</section>
</template>

<script>
// Components
import AppTitle from 'src/components/AppTitle'

export default {
	components: {
		AppTitle,
	},
	data() {
		return {
			scenario_id: "",
		}
	},
	mounted() {
		this.fetchScenarios();
		this.fetchSaves();
	},
	methods: {
		fetchScenarios() {
			this.$store.dispatch("fetchScenarios");
		},
		fetchSaves() {
			this.$store.dispatch("fetchSaves");
		},
		createSave() {
			this.$store.dispatch("createSave");
		},
		deleteSave(save_id) {
			this.$store.dispatch("deleteSave", {
				saved_scenario_id: save_id,
			})
		},
		resumeSave(save_id) {
			this.$store.dispatch("resumeSave", {
				saved_scenario_id: save_id,
			})
			.then(()=>{
				this.$router.push({name:"game"})
			})	
		},
	},
	computed: {
		saves() {
			return this.$store.state.saves;
		},
		scenarios() {
			return this.$store.state.scenarios;
		},
	},
}

</script>

<style lang="scss">
@import "src/variables.scss";

#saves-section {
	form {
		color: $white;
		display: flex;

		div {
			display: flex;

			label {
				display: flex;
				align-items: center;
			}

			select {
				margin: 0 10px;
				padding: 10px;
				border: 0;
				border-bottom: 1px solid $white; 
				color: $white;
				background: transparent;

				&:focus, &:active {
					outline: 0;
					border-bottom-color: $purple;
				}		
			}
		}

		input {
			font-size: 16px;
		}
	}

	table { 
		border-collapse: collapse;
		margin: 50px 0;
		color: $white;

		tr:nth-child(n+2) {
			border-bottom: 1px solid rgba(#fff, 0.5);
			
			&:hover {
				background: $purple;
				cursor: pointer;
			}

			i {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 30px;
				height: 30px;
				font-size: 1.4em;
				
				&:hover {
					font-size: 1.7em;
				}
			}
		}
		td, th {
			text-align: center;
			padding: 10px 30px;
		}

		th {
			color: $gold;
			padding: 30px 30px;
		}	
	}	

	p {
		color: $white;
		margin: 50px 0;
	}
}

@media all and (max-width: 800px) {
	
	#saves-section {
		form input {
			font-size: 13px;
		}

		table {
			font-size: 14px;

			th {
				padding: 30px 10px;
			}
		}
	}	
}

@media all and (max-width: 500px) {

	#saves-section {
		form {
			flex-direction: column;

			input {
				margin: 20px auto;
			}
		}

		table {
			font-size: 12px;
			margin: 20px 0;

			th {
				padding: 20px 10px;
			}

			td {
				padding: 10px 0px;
			}

			th:nth-child(3), td:nth-child(3)  {
				display: none;
			}
		}
	}
}
</style>