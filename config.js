	
	
	// NE JAAAAAAAAAAAAAAAAAAAMAIS METTRE DE GUILLEMET DANS LES PARAMETRES
	
	// LISTE DES JOURS D ACTIVITE TPL //
	var jour = []; 
	jour[0] = ["j0", "Lundi"]; 
	jour[1] = ["j1", "Mardi"];
	jour[2] = ["j2", "Mercredi"];
	jour[3] = ["j3", "Jeudi"];
	jour[4] = ["j4", "Vendredi"];
	jour[5] = ["j5", "Samedi"];
	jour[6] = ["j6", "Dimanche"];
	 
	// LISTE DES CRENEAUX D ACTIVITE TPL//
	var heure=[];
	// Lundi
	heure["j0"] = [];
	heure["j0"][0] = ["j0h0", "7h-9h"];
	//heure["j0"][1] = ["j0h1", "Matin"];
	//heure["j0"][2] = ["j0h2", "Après midi"];
	 
	//Mardi
	heure["j1"]=[];
	heure["j1"][0] = ["j1h0", "7h-9h"];
	//heure["j1"][1] = ["j1h1", "Matin"];
	//heure["j1"][2] = ["j1h2", "Après midi"];
	 
	//Mercredi
	heure["j2"] = [];
	heure["j2"][0] = ["j2h0", "7h-9h"];
	//heure["j2"][1] = ["j2h1", "Matin"];
	//heure["j2"][2] = ["j2h2", "Après midi"];
	
	//Jeudi
	heure["j3"] = [];
	heure["j3"][0] = ["j3h0", "7h-9h"];
	//heure["j3"][1] = ["j3h1", "Matin"];
	//heure["j3"][2] = ["j3h2", "Après midi"];
	
	//Vendredi
	heure["j4"] = [];
	heure["j4"][0] = ["j4h0", "7h-9h"];
	//heure["j4"][1] = ["j4h1", "Matin"];
	//heure["j4"][2] = ["j4h2", "Après midi"];
	
	//Samedi
	heure["j5"] = [];
	heure["j5"][0] = ["j5h0", ""];
	//heure["j5"][1] = ["j5h1", "Matin"];
	//heure["j5"][2] = ["j5h2", "Après midi"];
	
	//Dimanche
	heure["j6"] = [];
	heure["j6"][0] = ["j6h0", ""];
	//heure["j6"][1] = ["j6h1", "Après midi"];



	 
	// POUR CHAQUE CRENEAU, LA LISTE DES SPOTS AUTORISéS//
	var lieu = [];
	//        LUNDI
	//Activité spécial 7h-9h
	lieu["j0h0"] = [];
	lieu["j0h0"][0] = ["j0h0r0", "Gare Orléans"];
	//lieu["j0h0"][1] = ["j0h0r1", "Lieu 2"];
	//Matin
	lieu["j0h1"] = [];
	lieu["j0h1"][0] = ["j0h1r0", "Gare Orléans"];
	//Après midi
	lieu["j0h2"] = [];
	lieu["j0h2"][0] = ["j0h2r0", "Gare Orléans"];
	 
	
	//        MARDI
	//Activité spécial 7h-9h
	lieu["j1h0"] = [];
	lieu["j1h0"][0] = ["j1h0r0", "Gare Orléans"];
	//Matin
	lieu["j1h1"] = [];
	lieu["j1h1"][0] = ["j1h1r0", "Gare Orléans"];
	//Après midi
	lieu["j1h2"] = [];
	lieu["j1h2"][0] = ["j1h2r0", "Gare Orléans"];
	
	
	//        MERCREDI
	//Activité spécial 7h-9h
	lieu["j2h0"] = [];
	lieu["j2h0"][0] = ["j2h0r0", "Gare Orléans"];
	//Matin
	lieu["j2h1"] = [];
	lieu["j2h1"][0] = ["j2h1r0", "Gare Orléans"];
	//Après midi
	lieu["j2h2"] = [];
	lieu["j2h2"][0] = ["j2h2r0", "Gare Orléans"];
	
	//        JEUDI
	//Activité spécial 7h-9h
	lieu["j3h0"] = [];
	lieu["j3h0"][0] = ["j3h0r0", "Gare Orléans"];
	//Matin
	lieu["j3h1"] = [];
	lieu["j3h1"][0] = ["j3h1r0", "Gare Orléans"];
	//Après midi
	lieu["j3h2"] = [];
	lieu["j3h2"][0] = ["j3h2r0", "Gare Orléans"];
	
	//        VENDREDI
	//Activité spécial 7h-9h
	lieu["j4h0"] = [];
	lieu["j4h0"][0] = ["j4h0r0", "Gare Orléans"];
	//Matin
	lieu["j4h1"] = [];
	lieu["j4h1"][0] = ["j4h1r0", "Gare Orléans"];
	//Après midi
	lieu["j4h2"] = [];
	lieu["j4h2"][0] = ["j4h2r0", "Gare Orléans"];
	
	//        SAMEDI
	//Activité spécial 7h-9h
	lieu["j5h0"] = [];
	lieu["j5h0"][0] = ["j5h0r0", ""];
	
	//        DIMANCHE
	//Activité spécial 7h-9h
	lieu["j6h0"] = [];
	lieu["j6h0"][0] = ["j6h0r0", ""];

	
	
	
	function filltheselect(liste, choix)
	{switch (liste)
	   {
	   case "listejour":
	      raz("listeheure");
	      raz("listelieu");
		  
		  if(choix==-1){
			  choix=6;
		  }
		  choix='j'+choix;
		  console.log("choix"+choix);
		  console.log("heure"+heure[choix]);
		  console.log("heure"+heure[choix].length);
		  
	      for (i=0; i<heure[choix].length; i++)
	         {
	         new_option = new Option(heure[choix][i][1],heure[choix][i][0]);
	         document.formu.elements["listeheure"].
	 options[document.formu.elements["listeheure"].length]=new_option;
	         }
	      for (i=0; i<lieu[choix+"h0"].length; i++)
	         {
	         new_option = new Option(lieu[choix+"h0"][i][1],lieu[choix+"h0"][i][0]);
	         document.formu.elements["listelieu"].options[document.formu.
	 elements["listelieu"].length]=new_option;
	         }
	      break;
	   case "listeheure":
	      raz("listelieu");
	      for (i=0; i<lieu[choix].length; i++)
	         {
	         new_option = new Option(lieu[choix][i][1],lieu[choix][i][0]);
	         document.formu.elements["listelieu"].options[document.formu.
	 elements["listelieu"].length]=new_option;
	         }
	      break;
	   }
	}
	 
	function raz(liste)
	{l=document.formu.elements[liste].length;
	for (i=l; i>=0; i--)
	   document.formu.elements[liste].options[i]=null;
	}
