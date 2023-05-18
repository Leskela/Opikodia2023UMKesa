/******************************************************************************
Numeronarvauspeli

Arvataan numeroa 1-100 väliltä. Peli laskee arvausten määrän. 
Arvauksen jälkeen peli ilmoittaa, että oliko arvaus liian suuri 
vai liian pieni. Jos arvaa 75 ja arvaus on liian suuri peli estää
suuremman luvun arvaamisen ja sama liian pienelle. Peli estää 
myös 1-100 ulkopuolelta arvaamisen sekä kirjaimet (isNaN toimii).
Peli juhlii (päätä miten), kun arvaat oikein. 0
Lisää myös Reset nappula, jolla voi aloittaa 
pelin alusta. 

Jos arvaa esim 75 ja arvottu numero on pienempi, niin ei voi
arvata uudelee 75 tai suurempaa lukua tai arvottua numeroa pienmillä tehdään 
sama!
******************************************************************************/

window.onload = function() {
	const RightNum = Math.floor(Math.random() * 10) + 1;
	/*let getNum = document.getElementById("message").innerHTML;*/
	/*document.getElementById("viesti").innerHTML = "100";*/
	document.getElementById("viesti").innerHTML = RightNum;
	document.getElementById("RightNum").value = RightNum;   
	// document.getElementById("RightNum").value = "USA";

	// var x = document.getElementById("RightNum").value= RightNum; //"USA";
	// alert ("The value was changed to: " + x);
	//alert ("RightNum: " + RightNum);
  
}


function tarkasta() {
	// let getNum = document.getElementById("message").innerHTML;
	let getNum = 0, RightNum = 0;
	getNum = document.getElementById("message").value;
	RightNum = document.getElementById("RightNum").value;
	document.getElementById("viesti").innerHTML = getNum;
	
	alert ("RightNum: " + RightNum + ", getNum: " + getNum);

	if (getNum > 100) {
		window.alert("Liian suuri luku: " + RightNum + ".")
	}

	if (getNum < 1) {
		window.alert("Liian pieni luku: " + RightNum + ".")
	} else {
		if (getNum < RightNum) {
			window.alert("Arvaus liian pieni!")
		}

		if (getNum > RightNum) {
			window.alert("Arvaus liian suuri!")
		}


	}

	// if (getNum == 1) {
	// if (getNum > 1) {
	// 	window.alert("Tarvitsit vain "+getNum + " arvauksen löytääksesi oikean luvun. Olet ilmiömäinen!!! Oikea luku oli siis " + RightNum + ".")
	// }

}

function resetRightNum() {
	const RightNum = Math.floor(Math.random() * 10) + 1;
	document.getElementById("RightNum").value = RightNum; 

	alert ("RightNum: " + RightNum);
}


/*
window.onload = function() {
	if(localStorage.getItem("message")) {
		let message = localStorage.getItem("message");
		const local = document.getElementById("local")
		local.textContent = "In local storages:"+message;
	}
	if(sessionStorage.getItem("message")) {
		let message = sessionStorage.getItem("message")
		const session = document.getElementById("session");
		session.textContent = "In session storage:"+message;
	}
}

function storeToLocalStorage() {
	localStorage.setItem("message",document.getElementById("message").value);
}

function storeToSessionStorage() {
	sessionStorage.setItem("message",document.getElementById("message").value);
}*/