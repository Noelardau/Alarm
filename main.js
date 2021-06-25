
var alarmEntier = document.querySelector(".alarmCorps")
var voirAlarmeur = document.querySelector(".afficherAlarmeur")
var commandeAnnuler = document.querySelector('.annuler')


// afficher les input pour regler l'alarme
voirAlarmeur.addEventListener('click',()=>
{
	
	alarmEntier.classList.remove('nonVue')
	commandeAnnuler.classList.remove('nonVue')
})



var listing = document.querySelectorAll('ul li')
var Dec_choixAlarm = document.querySelector('#choixAl') /*declencheur*/


Dec_choixAlarm.addEventListener
('click',()=>{
	document.querySelector('ul').classList.remove("listAlarms")
}
)


listing.forEach((list)=>{


list.addEventListener("click",()=>{
	if(document.querySelectorAll('.choix')!= undefined){
		document.querySelectorAll('.choix').forEach((nonChoisi)=>{
			nonChoisi.classList.remove('choix')})
	}
	
	// avant gout du son d'alarme
	list.classList.add("choix")
	var audioMomnt = list.lastChild
	audioMomnt.play()
	setTimeout(()=>{
		audioMomnt.pause()
		audioMomnt.currentTime = 0
	},1400)
	
})



// annuler la tentative de mettre une alarme et cacher les inputs et tous
commandeAnnuler.addEventListener('click',(e)=>{
	e.stopPropagation()
	alarmEntier.classList.add('nonVue')
	commandeAnnuler.classList.add('nonVue') /*cacher aussi la commande annuler*/

	if(document.querySelectorAll('.choix')!= undefined)
	{
		document.querySelectorAll('ul li').forEach((ll)=>
		{
			ll.classList.remove('choix')
			document.querySelector('ul li').classList.add('choix')
		})

		
	}

	document.querySelector('ul').classList.add("listAlarms") /*cacher aussi la liste d'alarme*/

})

})


var control = document.querySelector('.stop')

// pour tous ce qui concerne les dates et heure

var date = (dt)=>{
	return {

		heure: dt.getHours(),
		minute:dt.getMinutes(),
		seconde: dt.getSeconds()

	}
}

// pour tous ce qui concerne les dates et heure





var alarm = date(new Date())

alarm.heure = ""
alarm.minute = ""
alarm.seconde = ""

var inputReg = document.querySelectorAll('.alarmReg input')


var ok = document.querySelector("button[type=submit]")

ok.addEventListener("click",(e)=>{

	e.preventDefault()
	alarmEntier.classList.add('nonVue')
	commandeAnnuler.classList.add('nonVue')

	document.querySelector('ul').classList.add("listAlarms")
	
 	sonChoix = document.querySelector('.choix').lastChild

	alarm.heure = inputReg[0].value
	alarm.minute = inputReg[1].value
	alarm.seconde = inputReg[2].value

	var dt = date(new Date())
	var heureAp = alarm.heure - dt.heure
	var minAp = alarm.minute - dt.minute
	var secAp = alarm.seconde - dt.seconde



	if(secAp < 0){
		secAp = secAp + 60
		minAp = minAp - 1
	}

	if(minAp < 0){
		minAp = minAp + 60
		heureAp = heureAp - 1
	}
	
	if(heureAp < 0){
		heureAp += 24
	}

	inputReg.forEach((all)=>{
		all.value = ""
	})


	document.querySelector(".message").innerHTML = ` Alarm après: ${(heureAp < 10)? "0" + heureAp : heureAp} : ${(minAp < 10 )? "0" + minAp : minAp} : ${(secAp < 10)? "0" + secAp : secAp} `

	setTimeout(()=>{document.querySelector(".message").innerHTML = ""},2000)

})




function MontreAlarmeur(){
	let montreElmt = date(new Date())

	// montre en temps reel
	document.querySelector('#afficheHeur').innerHTML = `${montreElmt.heure < 10 ? "0"+montreElmt.heure : montreElmt.heure} : ${montreElmt.minute < 10 ? "0"+montreElmt.minute : montreElmt.minute} :  ${montreElmt.seconde < 10 ? "0"+montreElmt.seconde : montreElmt.seconde}` 
	// montre en temps reel


	if((montreElmt.heure == alarm.heure && montreElmt.minute == alarm.minute && montreElmt.seconde == alarm.seconde))
	{
	

		if(montreElmt.heure == ""){montreElmt.heure = 0}
		if(montreElmt.minute == ""){montreElmt.minute = 0}     
		if(montreElmt.seconde == ""){montreElmt.seconde = 0}

		document.querySelector(".message").innerHTML = `Il est ${montreElmt.heure < 10 ? "0"+montreElmt.heure : montreElmt.heure} : ${montreElmt.minute < 10 ? "0"+montreElmt.minute : montreElmt.minute} :  ${montreElmt.seconde < 10 ? "0"+montreElmt.seconde : montreElmt.seconde}` 
		
		// controle du son une fois l'alarm declenché
		let sonRec = ()=>{
			sonChoix.play()
		}
		control.classList.add("show")
		
		let repeter = setInterval(sonRec,1000)


		control.addEventListener("click",(e)=>{
			e.preventDefault()
			sonChoix.pause()
			sonChoix.currentTime = 0
			clearInterval(repeter)
			control.classList.remove("show")
			document.querySelector(".message").innerHTML = ""
		})

			alarm.heure = ""
			alarm.minute = ""
			alarm.seconde = ""
	}

	}

MontreAlarmeur()


setInterval(MontreAlarmeur,1000)





