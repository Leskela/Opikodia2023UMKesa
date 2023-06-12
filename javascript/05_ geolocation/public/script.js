function findMe() {

	const status = document.querySelector("#status");
	const mapLink = document.querySelector("#maplink");
	
	mapLink.href = "";
	mapLink.textContent = "";
	
	function success(position) {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		
		status.textContent = "";
		
		mapLink.href = "https://www.openstreetmap.org/#map-18/"+latitude+"/"+longitude
		mapLink.textContent = "Latitude:"+latitude+", Longitude:"+longitude;		
	}
	
	function error() {
		status.textContent = "Cannot retrieve your position"
	}
	if(!navigator.geolocation) {
		status.textContent = "No geolocation in browser"
	} else {
		status.textContent = "Locating..."
	}
	
	navigator.geolocation.getCurrentPosition(success,error);
}