<template>
	<div id="signup-div">
		<div id="central-div">
			<form @submit.prevent="login" >
				<h1>Se connecter</h1>
				<input v-model="username" type="email" name="email" placeholder="E-mail" />
				<input v-model="password" type="password" name="password" placeholder="Mot de passe" />
				<div>
					<button class="base-btn-filled" type="submit">Connexion</button>
				</div>
				<p class="alert" v-if="display_error">L'adresse mail et/ou le mot de passe sont incorrects !</p>
			</form>

			<div id="img-div" alt="galaxie"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			username: "",
			password: "",
			valid: true,
			display_error: false,
		}
	},
	methods: {
		login() {
			this.display_error = false;
			
			this.$store.dispatch("retrieveToken", {
			username: this.username,
			password: this.password,
			})
			.then(() => {
				this.$store.dispatch("fetchAuthUser")
				this.$router.push({ name: "home" })
			})
			.catch(() => {
				this.display_error = true;
			})
		},
	},
}
</script>

<style lang="scss">
@import "src/variables.scss";

#signup-div {
	/* Display & Box Model */
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: calc(100vh - 145px);
}

#central-div {
	/* Display & Box Model */
	display: flex;
	min-width: 350px;
	width: 100%;
	max-width: 700px;
	margin: 40px 30px;
	/* Color */
	background-color: $white;

	.alert {
		width: 100%;
		border-radius: 5px;
		background-color:#f8d7da;
		list-style-position: inside;
		padding: 10px;
		color: $purple;
		font-size: 12px;
	}

	form {
		/* Display & Box Model */
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		min-width: 350px;
		width: 50%;
		padding: 50px;

		div {
			/* Display & Box Model */
			margin: 20px;
		}

		h1 {
			/* Display & Box Model */
			margin: 20px 0;
			text-align: center;
			/* Text */
			font-weight: bold;
		}

		input {
			/* Display & Box Model */
			box-sizing: border-box;
			width: 100%;
			padding: 12px 15px;
			margin: 8px 0;
			/* Color */
			background-color: $gray-light;
			border: 2px transparent solid;
			outline: none;

			&:focus {
				/* Color */
				border-color: $purple;;
				background-color: $white;
			}
		}
	}

	#img-div {
		/* Display & Box Model */
		width: 50%;
		min-width: 0;

		/* Color */
		background: url('~src/assets/decoration/moon_earth.jpg') scroll no-repeat top center;
		background-size: cover;
		overflow: hidden;
	}
}

@media all and (max-width: 500px) {

	#central-div {
		max-width: 300px;
		min-width: 0;

		form {
			padding: 50px 20px;
			min-width: 0;
			width: 100%;
		}

		#img-div {
			display: none;
		}
	}
}

</style>