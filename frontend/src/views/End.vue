<template>    
	<section id="home-section">
        
		<AppTitle text="Félicitation !"></AppTitle>
        <p>
            Vous avez réussi à vous échapper de la station lunaire LARAVEL-3 à l'aide votre vaisseau !
        </p>
        <p>
            Alors que vous regardez la station à travers le hublo, l'alarme de votre vaisseau retentit. Vous vous penchez sur le tableau de bord pour essayer
            de comprendre d'où vient le problème. Une sueur froide vous parcours l'échine en comprenant d'où vient le problème : 
            les commandes de direction sont défectueuses ! Pris de panique, vous essayez de changer la trajectoire du vaisseau mais tout cela en vain.
            Vous regardez à travers le hublo de votre vaisseau et contemplez, non-seulement la lune, mais aussi la terre devenir de plus en plus petit...
        </p>
        <p>
            Une fois calmé, vous allumez votre ordinateur de bord et remarquez que le vaisseau est programmé pour aller sur la station JANGO-2 de la planete Mars !
            Après quelques minutes de réflexions, vous vous levez de votre siège et vous dirigez vers votre capsule cryogénique. Vous avez décidez que la meilleur solution
            est de vous mettre en hyper-sommeil en attendant d'atteindre la station JANGO-2.
        </p>
        <p>
            Y'a t'il encore des surivivants à bord de la station JANGO-2 ? Le COVID-19 a-t'il dit son dernier mot ? Vous aurez toutes les réponses dans le
            prochain scénario : Survive mars !
        </p>
        
		<router-link class="base-btn-filled" to="/">Retour</router-link>
	</section>
</template>

<script>
import AppTitle from 'src/components/AppTitle'

export default {
	components: {
		AppTitle,
	},
	data(){
		return{
		}
    },
    mounted() {
        this.$store.state.scenarioEnd = false;
    }
}
</script>

<style lang="scss">

</style>