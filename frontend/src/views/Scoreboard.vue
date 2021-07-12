<template>
    <section id="saves-section">
		<AppTitle text="Tableau des scores"></AppTitle>
        <table id="scoreboard">
            <tr>
                <th>Place</th>
                <th>Nom du joueur</th>
                <th>Temps</th>
            </tr>
            <tr v-for="(value, index) in scoreboard" :key="index">
                <td>#{{index + 1}}</td>
                <td>{{value.name}}</td>
                <td>{{value.time}} secondes</td>
            </tr>
        </table>
    </section>
</template>

<script>
import AppTitle from 'src/components/AppTitle'

export default {
    name:"scoreboard",
    components: {
		AppTitle,
	},
    mounted() {
        this.fetchScoreboard();
    },
	methods: {
		fetchScoreboard() {
            this.$store.dispatch("fetchScoreboard");
        },
    },
        
    computed: {
        scoreboard() {
            return this.$store.state.scoreboard;
        },
    },
}
</script>

<style lang="scss">
    
</style>