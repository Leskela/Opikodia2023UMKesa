window.onload = function() {
	let form = document.getElementById("form");
	form.addEventListener("submit",submit);
}

function submit(event) {
	event.preventDefault();
	let username_input = document.getElementById("username");
	let password_input = document.getElementById("password");
	let username = username_input.value;
	let password = password_input.value;
	let user = {
		"username":username,
		"password":password
	}
	login(user);
}

async function login(user) {
	let request = {
		"method":"POST",
		"headers":{
			"Content-type":"application/json"
		},
		"body":JSON.stringify(user)
	}
	let response = await fetch("/login",request);
	if(!response) {
		return;
	}
	if(response.ok) {
		console.log("Logged in")
	} else {
		console.log("Server responded with a status "+response.status+" "+response.statusText)
	}
}


