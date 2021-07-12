<template>
	<div id="signup-div">
		<div id="central-div">
			<form @submit.prevent="register">
				<h1>Créer un compte</h1>
				<input v-model="name" type="text" name="username" placeholder="Nom" required />
				<input v-model="email" type='email' name="e-mail" placeholder="E-mail" required/>
				<input v-model="password" type="password" name="password" placeholder="Mot de passe" required />
				<input v-model="password_confirmation" type="password" name="confirmPass" placeholder="Confirmer mot de passe" required>
				<div>
					<button class="base-btn-filled" :disabled="!valid" type="submit">S'inscrire</button>
				</div>
			
				<ul class="alert" v-if="errors.length">
					<li v-for="(value, key, index) in errors" :key="index">{{value}}</li>
				</ul>

			</form>
			<div id="img-div" alt="galaxie"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Register",
	data(){
		return{
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
			valid: true,
			errors: [],
		}
	},
	methods:{
		register() {
			this.errors = [];

			this.$store.dispatch("register",{
				name: this.name,
				email: this.email,
				password: this.password,
				password_confirmation: this.password_confirmation,
			})
			.then(()=>{
				this.$router.push({name:"login"})
			})
			.catch(error => {
				this.errors = Object.values(error.response.data.errors).flat();
			})
		},
	},
}
</script>

<style lang="scss">

.alert {
	width: 115%;
	border-radius: 5px;
	background-color:#f8d7da;
	list-style-position: inside;
}

.alert li {
	padding: 10px;
	color:#cc3a2a;
	font-size: 12px;
}

</style>