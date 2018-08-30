<!DOCTYPE html>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1">
<head>
	<title>Ryan Rackemann</title>
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body class="w3-dark-gray w3-animate-opacity">
	<!-- Outer Wrap -->
	<header class="w3-padding-16 w3-white w3-shadow w3-margin-bottom">
		<div class="w3-container w3-center">
			<h1 class="w3-panel w3-leftbar w3-bottombar w3-rightbar w3-topbar w3-border-teal w3-padding-32">Ryan Rackemann</h1>
		</div>
	</header>
	<div class="w3-container w3-padding-32 w3-dark-gray">
		<div class="w3-half">
			<h2 class="w3-panel w3-leftbar w3-border-teal">About me</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra velit ut velit euismod scelerisque. Pellentesque auctor elit dolor, eget rutrum purus condimentum eu.</p>
				<p>Maecenas euismod sem luctus metus commodo, vel molestie arcu aliquet. Nullam placerat congue mauris in ultricies. Sed et libero nibh. Vestibulum nisi tellus, malesuada sed pellentesque eu, porttitor sed arcu. Nam non commodo purus. Maecenas scelerisque ultricies lacinia. Etiam ultrices felis tincidunt purus sodales commodo. Ut bibendum enim sit amet massa porta accumsan.</p>
		</div>
		<div class="w3-center w3-half sidePadding">
			<div class="w3-content w3-display-container">
				<!-- Slideshow Start -->
				<div class="w3-display-container mySlides">
				  <img src="img/nasa.jpg" />
				  <div class="w3-display-topmiddle w3-small w3-container w3-padding-16 w3-dark-gray w3-opacity-min">Nasa</div>
				</div>
				<div class="w3-display-container mySlides">
				  <img src="img/ski.jpg" />
				  <div class="w3-display-topmiddle w3-small w3-container w3-padding-16 w3-dark-gray w3-opacity-min">Skiing</div>
				</div>
				<div class="w3-display-container mySlides">
				  <img src="img/disney.jpg" />
				  <div class="w3-display-topmiddle w3-small w3-container w3-padding-16 w3-dark-gray w3-opacity-min">Disneyland</div>
				</div>
				<button class="w3-button w3-display-left w3-dark-gray w3-hover-black w3-opacity slider" onclick="plusDivs(-1)">&#10094;</button>
				<button class="w3-button w3-display-right w3-dark-gray w3-hover-black w3-opacity slider" onclick="plusDivs(+1)">&#10095;</button>
				<!-- Slideshow End -->
			</div>
		</div>
	<script type="text/javascript" src="js/slide.js"></script>
	</div>
	<div class="w3-container w3-padding-32 w3-white">
		<h2 class="w3-panel w3-leftbar w3-border-teal">Projects</h2>
		<p>There have been many projects that I have worked on through my time at CSU Channel Islands as both student and student worker.</p>
		<div class="w3-row-padding w3-center">
			<div class="w3-third">
				<a href="#" class="nolink">
					<div class="w3-card-2 w3-black w3-hover-teal w3-hover-shadow w3-margin-bottom">
						<img src="img/ski.jpg" alt="" />
						<div class="w3-container">
							<h3>Card 1</h3>
							<p>Little description explaining what this project is</p>
						</div>
					</div>
				</a>
			</div>
			<div class="w3-third">
				<a href="#" class="nolink">
					<div class="w3-card-2 w3-black w3-hover-teal w3-hover-shadow w3-margin-bottom">
						<img src="img/disney.jpg" alt="" />
						<div class="w3-container">
							<h3>Card 2</h3>
							<p>Little description explaining what this project is</p>
						</div>
					</div>
				</a>
			</div>
			<div class="w3-third">
				<a href="#" class="nolink">
					<div class="w3-card-2 w3-black w3-hover-teal w3-hover-shadow w3-margin-bottom">
						<img src="img/nasa.jpg" alt="" />
						<div class="w3-container">
							<h3>Card 3</h3>
							<p>Little description explaining what this project is</p>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class="w3-container w3-padding-32 w3-dark-gray">
		<h2 class="w3-panel w3-leftbar w3-border-teal">Skills</h2>
		<h3>Programming Languages</h3>
		<div class="horList w3-large">
			<ul>
				<li>C</li>
				<li>C++</li>
				<li>CSS</li>
				<li>HTML</li>
				<li>Java</li>
				<li>JavaScript</li>
				<li>Latex</li>
				<li>PHP</li>
				<li>Python</li>
				<li>SQL</li>
				<li>XML</li>
				<li>XSL/XSLT</li>
			</ul>
		</div>
		<h3>Integrations</h3>
		<div class="horList w3-large">
			<ul>
				<li>Google ReCaptcha (JavaScript or PHP)</li>
				<li>PHPMailer</li>
				<li>Bootstrap</li>
				<li>W3.css</li>
			</ul>
		</div>
		<h3>Other</h3>
		<div class="horList w3-large">
			<ul>
				<li>PHP and JavaScript Form Validation</li>
			</ul>
		</div>

	</div>
	<div class="w3-container w3-padding-32 w3-black">
		<h2 class="w3-panel w3-leftbar w3-border-teal">Contact</h2>
		<?php
			include 'php/validation.php';
			if(isset($_POST['submit']) && validateForm()){

				getResponse();
			}
			getForm();
		?>
		
	</div>
	<p>*Disclaimer that this isn't done yet</p>
</body>
</html>
