<?php

function getForm(){
	echo "<form method=\"post\" name=\"contactForm\" action=\"<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>\">
			<div class=\"w3-half w3-margin-bottom\">
				<div class=\"w3-row w3-container\">
					<label for=\"name\">
						<div class=\"w3-col  icon\">
							<i class=\"w3-xxlarge fa fa-user\"></i>
						</div>
					</label>
					<div class=\"w3-rest\">
						<input class=\"w3-input w3-border\" id=\"name\" name=\"name\" type=\"text\" placeholder=\"First Last\" required></input>
					</div>
				</div>
			</div>
			<div class=\"w3-half w3-margin-bottom\">
				<div class=\"w3-row w3-container\">
					<label for=\"email\">
						<div class=\"w3-col icon\">
							<i class=\"w3-xxlarge fa fa-envelope-o\"></i>
						</div>
					</label>
					<div class=\"w3-rest\">
						<input class=\"w3-input w3-border\" id=\"email\" name=\"email\" type=\"text\" placeholder=\"Email\" required>
					</div>
				</div>
			</div>
			<div class=\"w3-row w3-container clearBoth\">
				<label for=\"message\">
					<div class=\"w3-col icon\">
						<i class=\"w3-xxlarge fa fa-pencil\"></i>
					</div>
				</label>
				<div class=\"w3-rest\">
					<textarea rows=\"3\" cols=\"50\" class=\"w3-input w3-border\" id=\"message\" name=\"message\" type=\"text\" placeholder=\"Message\" required></textarea>
				</div>
			</div>
			<div class=\"w3-center\">
				<button data-theme=\"dark\" data-sitekey=\"6LcYA2oUAAAAAJh-rXuTtZrDfV173Y5isPyIVIqE\" type=\"submit\" class=\"g-recaptcha w3-xlarge w3-button w3-section w3-teal w3-hover-white w3-padding\">Submit <i class=\"w3-xlarge fa fa-check-square\"></i></button>
			</div>
		</form>'"
}

function validateForm(){
	$valid = 0;
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$GLOBALS['name'] = cleanInput($_POST["name"]);
		$GLOBALS['email'] = cleanInput($_POST["email"]);
		$GLOBALS['comment'] = cleanInput($_POST["comment"]);
		if(!empty($GLOBALS['name']) && filter_var($GLOBALS['email'], FILTER_VALIDATE_EMAIL) && !empty($GLOBALS['email']) && !empty($GLOBALS['comment']) ){
			$valid = 1;
		}	
	}
	return $valid;
}

function cleanInput($formFieldInput) {
	$formFieldInput = trim($formFieldInput);
	$formFieldInput = stripslashes($formFieldInput);
	$formFieldInput = htmlspecialchars($formFieldInput);
	return $formFieldInput;
}

function getResponse(){
	if($GLOBALS['finalResult']){
		echo('<div class="alert alert--success"><p><strong>Well done!</strong> You successfully submitted the contact form.</p></div>');
	}
	else{
		echo('<p>Please complete all form fields. Thank you.</p>');
	}
} // End getResponse()

function sendEmail(){
	$address = "ryan.rackemann025@myci.csuci.edu";
	$subject = "Contact Form Submission";

	$message = "
<html>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
<title>Contact form submission</title>
<style>
body{
	width: 100%;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 13px;
}
table{
	width: 80%;
	height: auto;
	border-spacing: 0;
}
tr:nth-child(odd) {
    background-color: #e4e4e4;
}
td{
	padding: 6px;
}

</style>
</head>
<body>
<h1>Contact Form Submission</h1>
<table>
	<tr>
		<td>Name</td>
		<td>{$GLOBALS['name']}</td>
	</tr>
	<tr>
		<td><strong>Email</strong></td>
		<td>{$GLOBALS['email']}</td>
	</tr>
	<tr>
		<td><strong>Message</strong></td>
		<td>{$GLOBALS['comment']}</td>
	</tr>
</table>
</body>
</html>
	";

	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	mail($address,$subject,$message,$headers);
}

?>