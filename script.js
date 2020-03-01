var NomUser=localStorage.NomUser;
var IdUser=localStorage.IdUser;
if(localStorage.email){
	document.getElementById('InputLogin').value=localStorage.email;
	document.getElementById('InputPwd').value=localStorage.password;
	document.getElementById('checkbox').checked=localStorage.sauvegardelogin;
}



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



$(function() {
	$(".btn").click(function() {
		$(".form-signin").toggleClass("form-signin-left");
    $(".form-signup").toggleClass("form-signup-left");
    $(".frame").toggleClass("frame-long");
    $(".signup-inactive").toggleClass("signup-active");
    $(".signin-active").toggleClass("signin-inactive");
    $(".forgot").toggleClass("forgot-left");   
    $(this).removeClass("idle").addClass("active");
	});
});

$(function() {
	$(".btn-signup").click(function() {
  
		
		if(document.getElementById("Creation_Prenom").value==""){
			alert("Tu dois renseigner ton prénom");
		}
		else if(document.getElementById("Creation_Nom").value==""){
			alert("Tu dois renseigner ton nom");
		}
		else if(document.getElementById("Creation_Tel").value==""){
			alert("Tu dois renseigner un numéro de téléphone");
		}
		else if(document.getElementById("Creation_Email").value==""){
			alert("Tu dois renseigner ton mail");
		}
		else if(!validateEmail(document.getElementById("Creation_Email").value)){
			alert("L'adresse mail n'est pas conforme");
		}
		else if(document.getElementById("Creation_Password").value==""){
			alert("Tu dois renseigner un mot de passe");
		}
		else if(document.getElementById("Creation_Confirmpassword").value==""){
			alert("Tu dois confirmer ton mot de passe");
		}
		else if( document.getElementById("Creation_Password").value.length<8){
			alert("Ton mot de passe doit faire au moins 8 charactères. Actuellement il n'en fait que "+document.getElementById("Creation_Password").value.length);
		}
		else if(document.getElementById("Creation_Password").value!=document.getElementById("Creation_Confirmpassword").value){
			alert("La confirmation du mot de passe doit être identique au mot de passe");
		}else{
			var NewUser = firebase.auth().createUserWithEmailAndPassword(document.getElementById("Creation_Email").value, document.getElementById("Creation_Password").value).then(function(firebaseUser) {
				/*console.log("User " + firebaseUser.uid + " created successfully!");
				console.log(firebaseUser );
				console.log( firebaseUser.user.uid );
				
				alert(firebaseUser );
				console.log(firebaseUser.user );
				alert(firebaseUser.user.uid );*/
				
				
				
				firebase.database().ref('user/' + firebaseUser.user.uid).set({
						'LeNom': document.getElementById("Creation_Nom").value+'',
						'LePrenom': document.getElementById("Creation_Prenom").value+'',
						'Nom' : document.getElementById("Creation_Prenom").value+' '+document.getElementById("Creation_Nom").value[0],
						'Tel':document.getElementById("Creation_Tel").value+''
				});
				
				
				var creationUserSynchro = firebase.database().ref('user/'+firebaseUser.user.uid );
				creationUserSynchro.on('value', function(snapshot) {
						NomUser=snapshot.val();
						
						localStorage.NomUser=NomUser.Nom;
						localStorage.IdUser=NomUser.IdUser;
						IdUser=NomUser.IdUser;
						
				});

			   $(".nav").toggleClass("nav-up");
			   $(".form-signup-left").toggleClass("form-signup-down");
			   $(".success").toggleClass("success-left"); 
			   $(".frame").toggleClass("frame-short");
				
				
				
				
				//return firebaseUser;
			})
			
			
			
		}
	});
	
	
});

$(function() {
	$(".btn-signin").click(function() {
		
		
	     
	
	var email=document.getElementById("InputLogin").value+"";
	var password=document.getElementById("InputPwd").value+"";
  

    //Sign In User with Email and Password
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
   // user signed in
   
			if(document.getElementById('checkbox').checked ){
				localStorage.email=email;
				localStorage.password=password;
				localStorage.sauvegardelogin=true;
			}else{
				localStorage.email="";
				localStorage.password="";
				localStorage.sauvegardelogin=false;
			}
   
   
		   $(".btn-animate").toggleClass("btn-animate-grow");
		  $(".welcome").toggleClass("welcome-left");
		  $(".cover-photo").toggleClass("cover-photo-down");
		  $(".frame").toggleClass("frame-short");
		  $(".profile-photo").toggleClass("profile-photo-down");
		  $(".btn-goback").toggleClass("btn-goback-up");
		  $(".forgot").toggleClass("forgot-fade");
   
   
   
		}).catch(function(error) {
    // Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
		if(errorMessage=="The email address is badly formatted."){
			alert("Votre adresse mail n'est pas conforme.");
		}
		if(errorMessage=="There is no user record corresponding to this identifier. The user may have been deleted."){
			alert("Votre adresse mail n'est pas enregistré. Veuillez vous rapprocher de votre responsable de prédication ou du préposé aux territoires.");
		}
		if(errorMessage=="The password is invalid or the user does not have a password."){
			alert("Votre mot de passe est incorrecte. Veuillez reessayer.");
		}
		if(errorMessage=="The password is invalid or the user does not have a password."){
			alert("Votre mot de passe est incorrecte. Veuillez reessayer.");
		}
		//alert('La connection a échoué. Verifiez votre adresse mail et mot de passe.');
	});


	


	});
});




function envoyerNotif(Frere1,Frere2,Jour,Lieu,Heure){
	var Nom_1="";
	var Mail_1="";
	var Notif_1="";
	var Tel_1="";
	
	var Nom_2="";
	var Mail_2="";
	var Notif_2="";
	var Tel_2="";
	
	
	var AllUsers = firebase.database().ref('user');
	AllUsers.on('value', function(snapshot) {
		for(SimpleUser in snapshot.val()){

			if(snapshot.child(SimpleUser).child('Nom').val()==Frere1){
				
				 Nom_1=snapshot.child(SimpleUser).child('Nom').val();
				 Mail_1=snapshot.child(SimpleUser).child('Mail').val();
				 Notif_1=snapshot.child(SimpleUser).child('Notif').val();
				 Tel_1=snapshot.child(SimpleUser).child('Tel').val();

			}
			if(snapshot.child(SimpleUser).child('Nom').val()==Frere2){
				
				 Nom_2=snapshot.child(SimpleUser).child('Nom').val();
				 Mail_2=snapshot.child(SimpleUser).child('Mail').val();
				 Notif_2=snapshot.child(SimpleUser).child('Notif').val();
				 Tel_2=snapshot.child(SimpleUser).child('Tel').val();
				
			}
			
		}
		
		firebase.database().ref('notif/' + SimpleUser).set({
					'Jour': Jour,
					'Heure': Heure,
					'Lieu': Lieu,
					'Nom_2': Nom_2,
					'Mail_2': Mail_2,
					'Notif_2': Notif_2,
					'Tel_2': Tel_2,
					'Nom_1': Nom_1,
					'Mail_1': Mail_1,
					'Notif_1': Notif_1,
					'Tel_1': Tel_1,
		});
		
	});	
	
}

var OneSignal = window.OneSignal || [];


////////////////////////////////////////////////////////////////////////////////Code Login


if(localStorage.IdUser=="" || !localStorage.IdUser || localStorage.IdUser=="undefined" || localStorage.IdUser==undefined){
	document.styleSheets[2].disabled = true;
}else{
	
		document.styleSheets[3].disabled = true;
		document.styleSheets[2].disabled = false;
		$('.formInput').fadeOut(0);
	    $('.wrapperLogin').addClass('form-success');
	 
				OneSignal.getUserId(function(ids) {				
						firebase.database().ref('user/' + IdUser).update({
							'Notif': ids
						});
				});
	
}


firebase.auth().onAuthStateChanged(function(user) {
 // if (user) {localStorage.NomUser
 if (user.uid ) {
	  console.log(user);
	  IdUser=user.uid;

	  OneSignal.getUserId(function(ids) {				
			firebase.database().ref('user/' + IdUser).update({
				'Notif': ids
			});
	  });
		  
	  
	  var jourDatabase = firebase.database().ref('user/'+IdUser);
	  jourDatabase.on('value', function(snapshot) {
			NomUser=snapshot.val();
			
			
				localStorage.NomUser=NomUser.Nom;
				localStorage.IdUser=NomUser.IdUser;
			
			//CECI EST L'INSCRIPTION AUX NOTIFICATIONS 
			
			
			
			
			//var OneSignal = window.OneSignal || [];
			  OneSignal.push(function() {
				OneSignal.init({
				  appId: "534ba2b7-9694-4188-9c68-1044e9a2ebba",
				});
				
				OneSignal.getUserId(function(ids) {				
						firebase.database().ref('user/' + IdUser).update({
							'Notif': ids
						});
				});
				
				
			  });
			
			
			
			//CECI EST LE PROCESSUS QUI VA RECEPTIONNER TOUTE ELS INFORMATIONS EN bdd

	
			//var depannerConfirmation = "javascript:if(window.confirm(\'Voulez vous vous inscrire à ce créneau? Si vous avez un imprévu vous devrez vous organiser directement avec votre compagnon.\')){	firebase.database().ref(\'calendrier/\' + listejour+\'/\'+listeheure+\'/\'+listelieu+\'/\').set({\'1\': snapshot.child(\'1\').val(),\'2\': \'"+NomUser+"\'});this.replaceWith( \'"+NomUser+"\' );};";
			//var ListeDesCreneaux ='';


			var jourDatabase = firebase.database().ref('calendrier');
			jourDatabase.on('value', function(snapshot) {
			  for(Jour in snapshot.val()){
				  ListeDesCreneaux ='';
				  var Equilibre="pair";
				  var EquilibreMsg=": Toutes les associations sont complètes mais vous pouvez réserver un autre créneau. <br />";
				//console.log(Jour);
				for(Lieu in snapshot.child(Jour).val()){
					ListeDesCreneaux+='<br /> <br /> • <u><b>'+Lieu+'</b></u> <br />';
					//console.log(Lieu);
					for(Heure in snapshot.child(Jour).child(Lieu).val()){
						//console.log(Heure);
						//for(Frere1 in snapshot.child(Jour).child(Lieu).child(Heure).child("TEST").val()){
							console.log(Frere1);
							var Frere1=snapshot.child(Jour).child(Lieu).child(Heure).child("1").val();
							var Frere2=snapshot.child(Jour).child(Lieu).child(Heure).child("2").val();
							console.log(Jour+' '+Lieu+' '+Heure+' '+Frere1+' '+Frere2);
							

							if(!Frere2){
								var depannerConfirmation = "javascript:if(window.confirm(\'Voulez vous vous inscrire à ce créneau? Si vous avez un imprévu vous devrez vous organiser directement avec votre compagnon.\')){	      if('"+Frere1+"'!='"+NomUser.Nom+"'){ firebase.database().ref(\'calendrier/"+Jour+"/"+Lieu+"/"+Heure+"/\').set({\'1\': \'"+Frere1+"\',\'2\': \'"+NomUser.Nom+"\'});                        envoyerNotif('"+Frere1+"','"+NomUser.Nom+"','"+Jour+"','"+Lieu+"','"+Heure+"');                       this.replaceWith( \'"+NomUser.Nom+"\' );}else{alert('Vous ne pouvez pas réserver deux fos le même créneau');}        };";
								var BoutonDepanner='<a class="c-add o-btn js-event__add" onclick="'+depannerConfirmation+'"  href="javascript:;"><font color="red"><b>Dépanner</b></font></a>';

								
								Frere2=BoutonDepanner;
								Equilibre="impair";
								EquilibreMsg=": Vous pouvez dépanner certains créneaux. <br />";
							}
							ListeDesCreneaux+='<b>'+Heure+'</b> : '+Frere1+' - '+Frere2+'<br />'

						//}
					}
				}
				defaultEvents(Jour,
							 EquilibreMsg,
							ListeDesCreneaux,Equilibre);
			  }
			});	  
			
			
			
			
      });

    event.preventDefault();
	 $('.formInput').fadeOut(500);
	 $('.wrapperLogin').addClass('form-success');
	 setTimeout(() => { 
		
		//document.getElementsByClassName("wrapperLogin")[0].style.visibility = "hidden"; 
		
		document.styleSheets[3].disabled = true;
		document.styleSheets[2].disabled = false;
		
		//document.getElementsByClassName("wrapper")[0].style.visibility = "visible"; 
	 }, 1000);
  }else{
	  
	  //document.location.reload(true);
  }
  
  
  
  
});


     




/*
$("#login-button").click(function(event){

});*/

////////////////////////////////////////////////////////////////////////////////Code Login


//global variables
var monthEl = $(".c-main");
var dataCel = $(".c-cal__cel");
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var monthText = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mais",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre"
];
var indexMonth = month;
var todayBtn = $(".c-today__btn");
var addBtn = $(".js-event__add");
var saveBtn = $(".js-event__save");
var closeBtn = $(".js-event__close");
var winCreator = $(".js-event__creator");
var inputDate = $(this).data();
today = year + "-" + month + "-" + day;


// ------ set default events -------
function defaultEvents(dataDay,dataName,dataNotes,classTag){
  var date = $('*[data-day='+dataDay+']');
  date.attr("data-name", dataName);
  date.attr("data-notes", dataNotes);
  date.addClass("event");
  date.addClass("event--" + classTag);
}

//defaultEvents(today, 'YEAH!','Today is your day','aucun');
//defaultEvents('2020-12-25', 'MERRY CHRISTMAS','A lot of gift!!!!','pair');
//defaultEvents('2020-05-04', "LUCA'S BIRTHDAY",'Another gifts...?','impair');



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MENU

var BoutonMenuOpen = $(".BoutonMenuOpen");

BoutonMenuOpen.on("click", function() {
    if(document.getElementById('BoutonMenuOpen').checked){
		document.getElementById('next').style.display = 'None';
		document.getElementById('prev').style.display = 'None';
		document.getElementById('TitreMuneNomUtilisateur').textContent=NomUser.LePrenom+" "+NomUser.LeNom;

	}else{
		document.getElementById('next').style.display = 'Block';
		document.getElementById('prev').style.display = 'Block';

	}
});


function onManageWebPushSubscriptionButtonClicked(event) {
        getSubscriptionState().then(function(state) {
            if (state.isPushEnabled) {
                /* Subscribed, opt them out */
                OneSignal.setSubscription(false);
            } else {
                if (state.isOptedOut) {
                    /* Opted out, opt them back in */
                    OneSignal.setSubscription(true);
                } else {
                    /* Unsubscribed, subscribe them */
                    OneSignal.registerForPushNotifications();
                }
            }
        });
        event.preventDefault();
    }

    function updateMangeWebPushSubscriptionButton(buttonSelector) {
        var hideWhenSubscribed = false;
        var subscribeText = "Recevoir les notifications (Sauf sur safari)";
        var unsubscribeText = "Se desinscrire aux notifications";

        getSubscriptionState().then(function(state) {
            var buttonText = !state.isPushEnabled || state.isOptedOut ? subscribeText : unsubscribeText;

            var element = document.querySelector(buttonSelector);
            if (element === null) {
                return;
            }

            element.removeEventListener('click', onManageWebPushSubscriptionButtonClicked);
            element.addEventListener('click', onManageWebPushSubscriptionButtonClicked);
            element.textContent = buttonText;

            if (state.hideWhenSubscribed && state.isPushEnabled) {
                element.style.display = "none";
            } else {
                element.style.display = "";
            }
        });
    }

    function getSubscriptionState() {
        return Promise.all([
          OneSignal.isPushNotificationsEnabled(),
          OneSignal.isOptedOut()
        ]).then(function(result) {
            var isPushEnabled = result[0];
            var isOptedOut = result[1];

            return {
                isPushEnabled: isPushEnabled,
                isOptedOut: isOptedOut
            };
        });
    }

    var OneSignal = OneSignal || [];
    var buttonSelector = "#my-notification-button";

    /* This example assumes you've already initialized OneSignal */
    OneSignal.push(function() {
        // If we're on an unsupported browser, do nothing
        if (!OneSignal.isPushNotificationsSupported()) {
            return;
        }
        updateMangeWebPushSubscriptionButton(buttonSelector);
        OneSignal.on("subscriptionChange", function(isSubscribed) {
            /* If the user's subscription state changes during the page's session, update the button text */
            updateMangeWebPushSubscriptionButton(buttonSelector);
        });
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FIN MENU


// ------ functions control -------

//button of the current day
todayBtn.on("click", function() {
  if (month < indexMonth) {
    var step = indexMonth % month;
    movePrev(step, true);
  } else if (month > indexMonth) {
    var step = month - indexMonth;
    moveNext(step, true);
  }
});

//higlight the cel of current day
dataCel.each(function() {
  if ($(this).data("day") === today) {
    $(this).addClass("isToday");
    fillEventSidebar($(this));
  }
});

//window event creator
addBtn.on("click", function() {
  winCreator.addClass("isVisible");
  $("body").addClass("overlay");
  dataCel.each(function() {
    if ($(this).hasClass("isSelected")) {
      today = $(this).data("day");
      document.querySelector('input[type="date"]').value = today;
	  
	  filltheselect("listejour", new Date(today).getDay()-1);
    } else {
      document.querySelector('input[type="date"]').value = today;
	  filltheselect("listejour", new Date(today).getDay()-1);
    }
  });
});
closeBtn.on("click", function() {
  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
});
saveBtn.on("click", function() {
	
	var listejour = $("input[name=listejour]").val();
	
	var listeheure = $("select[name=listeheure]")
    .find(":selected")
    .text();
	
	var listelieu = $("select[name=listelieu]")
    .find(":selected")
    .text();



	 var jourDatabase = firebase.database().ref('calendrier/' + listejour+'/'+listelieu+'/'+listeheure+'/');
	 jourDatabase.on('value', function(snapshot) {
		 
		 if(!snapshot.child("1").val()){
			firebase.database().ref('calendrier/' + listejour+'/'+listelieu+'/'+listeheure+'/').set({
				'1': NomUser.Nom
		    });  
		 }else if(snapshot.child("2").val()&&snapshot.child("2").val()!=NomUser.Nom){
			alert("Ce créneau est déja pris.");
		 }else if(snapshot.child("1").val()&&snapshot.child("1").val()!=NomUser.Nom){
			firebase.database().ref('calendrier/' + listejour+'/'+listelieu+'/'+listeheure+'/').set({
				'1': snapshot.child("1").val(),
				'2': NomUser.Nom
		    });  
		 }
		 
		 
				
	 });

  

	
  /*var inputName = $("input[name=name]").val();
  var inputDate = $("input[name=listejour]").val();
  var inputNotes = $("textarea[name=notes]").val();
  var inputTag = $("select[name=tags]")
    .find(":selected")
    .text();

  dataCel.each(function() {
    if ($(this).data("day") === inputDate) {
      if (inputName != null) {
        $(this).attr("data-name", inputName);
      }
      if (inputNotes != null) {
        $(this).attr("data-notes", inputNotes);
      }
      $(this).addClass("event");
      if (inputTag != null) {
        $(this).addClass("event--impair" );
      }
      fillEventSidebar($(this));
    }
  });*/

  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
  $("#formu")[0].reset();
});

//fill sidebar event info
function fillEventSidebar(self) {
  $(".c-aside__event").remove();
  var thisName = self.attr("data-name");
  var thisNotes = self.attr("data-notes");
  var thisImportant = self.hasClass("event--aucun");
  var thisBirthday = self.hasClass("event--impair");
  var thisFestivity = self.hasClass("event--pair");
  var thisEvent = self.hasClass("event");
  
  switch (true) {
    case thisImportant:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--aucun'>" +
        thisName +
        " <span>" +
        thisNotes +
        "</span></p>"
      );
      break;
    case thisBirthday:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--impair'>" +
        thisName +
        " <span>" +
        thisNotes +
        "</span></p>"
      );
      break;
    case thisFestivity:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--pair'>" +
        thisName +
        " <span>" +
        thisNotes +
        "</span></p>"
      );
      break;
    case thisEvent:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event'>" +
        thisName +
        " <span>" +
        thisNotes +
        "</span></p>"
      );
      break;
   }
};
dataCel.on("click", function() {
  var thisEl = $(this);
  var thisDay = $(this)
  .attr("data-day")
  .slice(8);
  var thisMonth = $(this)
  .attr("data-day")
  .slice(5, 7);

  fillEventSidebar($(this));

  $(".c-aside__num").text(thisDay);
  $(".c-aside__month").text(monthText[thisMonth - 1]);

  dataCel.removeClass("isSelected");
  thisEl.addClass("isSelected");

});

//function for move the months
function moveNext(fakeClick, indexNext) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "-=100%"
    });
    $(".c-paginator__month").css({
      left: "-=100%"
    });
    switch (true) {
      case indexNext:
        indexMonth += 1;
        break;
    }
  }
}
function movePrev(fakeClick, indexPrev) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "+=100%"
    });
    $(".c-paginator__month").css({
      left: "+=100%"
    });
    switch (true) {
      case indexPrev:
        indexMonth -= 1;
        break;
    }
  }
}

//months paginator
function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
  switch (true) {
    case next:
      $(buttonId).on("click", function() {
        if (indexMonth >= 2) {
          $(mainClass).css({
            left: "+=100%"
          });
          $(monthClass).css({
            left: "+=100%"
          });
          indexMonth -= 1;
        }
        return indexMonth;
      });
      break;
    case prev:
      $(buttonId).on("click", function() {
        if (indexMonth <= 11) {
          $(mainClass).css({
            left: "-=100%"
          });
          $(monthClass).css({
            left: "-=100%"
          });
          indexMonth += 1;
        }
        return indexMonth;
      });
      break;
  }
}

buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

//launch function to set the current month
moveNext(indexMonth - 1, false);

//fill the sidebar with current day
$(".c-aside__num").text(day);
$(".c-aside__month").text(monthText[month - 1]);