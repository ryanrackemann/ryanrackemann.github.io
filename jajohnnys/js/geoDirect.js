var link = '';
function showPosition(position) {
	console.log(position.coords);
	link.href = 'https://www.google.com/maps/dir/' + position.coords.latitude + ',' + position.coords.longitude + '/JA+Johnny%E2%80%99s+Caf%C3%A9,+9134+Riverside+Dr,+Parker,+AZ+85344/@33.9336583,-117.7540089,8z/data=!4m8!4m7!1m0!1m5!1m1!1s0x80d1814c1e7321b9:0xc4b7d9254be6c4ee!2m2!1d-114.2223658!2d34.196768';
}

window.onload = function redirectToGoogle(){
	link = document.getElementById('direct');
	if(navigator.geolocation){
		link.addEventListener("click", navigator.geolocation.getCurrentPosition(showPosition));
	}
}