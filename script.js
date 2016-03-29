var 	affichage = document.getElementById("affichage"), 			// Récupération des élements HTML
	click = document.getElementById("click"),				// et initialisation des variables.
	multiplier = document.getElementById("multiplier"),
	affichagePrix = document.getElementById("prix"),
	autoclicker = document.getElementById("autoclicker"),
	bonus = document.getElementById("bonus"),
	
	score = 0,
	multiple = 1,
	prix =50,
	auto = false,
	time = 30,
	one = true,
	autoBuy = 1,
	autoScore = 500,
	
	bonusActive,
	baseMult;

	



affichagePrix.innerHTML = "Prix <br>" + prix;		// On initalise l'affichage des scores et on désactive les boutons	
affichage.innerHTML = "Score <br>" + score;
multiplier.disabled = true;
bonus.disabled = true;
autoclicker.disabled = true;



function checkMulti() {				// On définit les fonctions pour activer les bonus
	if (score >= prix) {
	multiplier.disabled = false;
	} else {
	multiplier.disabled = true;
	}
}

function checkAuto() {
	if (score >= autoScore) {
		autoclicker.disabled = false;	
	} else {
		autoclicker.disabled = true;
	}
}

function checkBonus() {
	if (score >= 5000) {
		bonus.disabled = false;
	} else {
		bonus.disabled = true;
	}
}





click.addEventListener("click", function() {		// onClick event pour le Clicker

	score = score + multiple;			// Cliquer ajoute la variable "multiple" à la variable "score"
	affichage.innerHTML = "Score <br>" + score;

	checkMulti();		// On check à chaque click si le score est assez haut pour débloquer les bonus.
	checkAuto();
	checkBonus();

})



multiplier.addEventListener("click", function(){		// onClick Event pour le bonus multiplicateur.

	multiple = multiple*2;	// Utiliser un bonus multiplicateur double à chaque utilisation le score gagné à chaque click;
	multiplier.value = "Multiplicateur : x"+multiple;

	score = score - prix;			// On retire le prix du bonus au score, on actualise le score
	affichage.innerHTML = "Score <br>" + score;

	prix=prix*2;				// On double le prix, on actualise le prix et on désactive le bouton
	affichagePrix.innerHTML = "Prix <br>" + prix;

	checkMulti();		// On check à chaque click si le score est assez haut pour débloquer les bonus.
	checkAuto();
	checkBonus();
	
// Si le bonus X2 ( à 5000 points ) est activé lorsque l'on utilise un multiplicateur, le multiplicateur 
// est autorisé à être mis à jour une fois. => Voir ligne 160

	if (bonusActive){		
		baseMult = baseMult*2;
		one = true;
		multiplier.value = "multiplicateur : x"+multiple + " (BONUS!!)";
	}

})



autoclicker.addEventListener("click", function() {		// onClick Event pour l'auto clicker

		score = score - autoScore;					// On retire 500 au score et on le met à jour
		affichage.innerHTML = "Score <br>" + score;	// avec auto = true, on autorise la fonction autoclick() à s'éxecuter
		auto = true;
		autoBuy = autoBuy * 2;
		autoScore = autoScore*2;
		autoclicker.value = "Autoclicker (" + autoBuy + ") - next Prix : " + autoScore;
		
		if (score <= prix) {				// On bloque les bonus en fonction du score restant.
			multiplier.disabled = true;
		}

	checkMulti();		// On check à chaque click si le score est assez haut pour débloquer les bonus.
	checkAuto();
	checkBonus();
		
})




function autoclick() {		// fonction qui s'éxecute une fois l'autoclick acheté ( si auto = true )

	if (auto) {

		score = score + autoBuy;				//On ajoute 5 x le nombre de fois que l'autoclick à été acheté
		affichage.innerHTML = "Score <br>" + score;	// au score toutes les secondes et on met à jour le score
		

		checkMulti();	
		checkAuto();		// On check à chaque interval si le score est assez haut pour débloquer les bonus.
		checkBonus();

	}
}

setInterval(autoclick, 1000);		// Interval d'une seconde pour boucler l'incrémentation du score.




bonus.addEventListener("click", function() {			// onClick Event pour le bouton BONUS
	
	bonusActive = true;			// On active le bonus, on désactive le bouton et on met à jour le score.
	bonus.disabled = true;
	score = score - 5000;
	affichage.innerHTML = "Score <br>" + score;

	baseMult = multiple;	
	multiple = multiple * 2;	// On stock le multiplicateur dans baseMult


	
	checkMulti();		// On check à chaque click si le score est assez haut pour débloquer les bonus.
	checkAuto();
	checkBonus();


	setTimeout(function(){
		
		bonusActive = false; 		// On désactive le bonus et on reset les variables après 30 secondes.
		multiple = baseMult;
		multiplier.value = "multiplicateur : x"+multiple;
		bonus.value = "BONUS - Prix : 5000";
		time = 30;
	}, 30000);

})

function bonusCountDown() {    	  // Fonction du Bonus, activé par le bouton bonus pendant 30s.
	
	if (bonusActive){
		
		if (one){  				// Si on utilise un multiplicateur durant le bonus, on met à jour le 
							// multiplicateur une seule fois par achat. Voir ligne 77
			multiple = baseMult*2;
			one = false;
		}

		bonus.value = "Time left = " + time;		// On décrémente la variable temps et on l'affiche.
		time--;
		multiplier.value = "multiplicateur : x"+multiple + " (BONUS!!)";

	}
}

setInterval(bonusCountDown, 1000);    		// Interval d'une seconde pour l'actualisation du temps.




