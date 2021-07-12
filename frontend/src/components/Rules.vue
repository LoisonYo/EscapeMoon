<template>
  <section id="rules-section">
     <AppTitle text="Règles du jeu"></AppTitle>
		<div>
			<p>
				Vous êtes actuelement coincé dans une salle. La porte devant vous est fermé à l'aide d'une carte magnétique ou d'une clé.
				Votre but est de résoudre les différentes énigmes de chaques salles et ainsi trouver l'emplacement de la clé ou de la carte magnétique.
			</p>
			<p>
				En cliquant sur différents objets présent sur la scène, des objets peuvent être ajouté à votre inventaire. Ces objets seront nécessaire pour avancer
				dans l'histoire. Par exemple, le tournevis peut être fusionné avec la radio et ainsi récupérer les piles. Comme expliqué précédement, les clés et
				les cartes magnétiques ne peuvent pas être utiliser que pour débloquer des portes et non pas pour la fusion.
			</p>
		</div>
	</section>
</template>

<script>
// Components
import AppTitle from 'src/components/AppTitle'

export default {
   name: "Rules",
   components: {
		AppTitle,
	},
}
</script>


<style lang="scss">
@import "src/variables.scss";

#rules-section {
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
}

@media all and (max-width: 800px) {
	#rules-section {
		p {
			font-size: 14px;
		}
	}
}

</style>