function checkUrl(){
	var url = window.location.href;
	if(window.location.href.includes("success")){
		document.getElementById("emailSuccess").style.display = "block";
		document.getElementById("emailSuccess").innerHTML = "Thank you for your email. I will respond to you as soon as I can.";
	}
}