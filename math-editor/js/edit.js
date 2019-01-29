document.getElementById("title").innerHTML = localStorage["title"] || "Title";
document.getElementById("document").innerHTML = localStorage["document"] || "Insert math writeup here";

setInterval(function() {
	localStorage["title"] = document.getElementById("title").innerHTML;
	localStorage["document"] = document.getElementById("document").innerHTML;
}, 1000);

function resetPage() {
	if (confirm('Are you sure you want to reset the page? You will lose any progress you haven\' downloaded')) {
		document.getElementById("title").innerHTML = "Title";
		document.getElementById("document").innerHTML = "Math writeup insert here";
	}
}

var htmlEntities = {
	'<br>':'\n',
	'</div><div>':'\n',
	'<div>':'',
	'</div>':''
}
function stripHTML(doc) {
	for (var e in htmlEntities) {
		doc = doc.split(e).join(htmlEntities[e]);
	}
	return doc;
}

function save() {
	var currentDoc = document.getElementById('document').innerHTML;
	var newDoc = stripHTML(currentDoc);
	var blob = new Blob([newDoc], {type: "text/plain"});
	var url = window.URL.createObjectURL(blob);
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = 'display: none;';
	a.href = url;
	a.download = document.getElementById('title').innerHTML;
	a.click();
}

// https://www.toptal.com/designers/htmlarrows/math/
var keywords = {
	'/isin':'&isin;',
	'^1':'&sup1;',
	'^2':'&sup2;',
	'^3':'&sup3;',
	'^+':'&8314;',
	'^-':'&8315;',
	'^=':'&8316;',
	'^(':'&8317;',
	'^)':'&8318;',
	'^n':'&8319;',
	'_0':'&8320;',
	'_1':'&8321;',
	'_2':'&8322;',
	'_3':'&8323;',
	'_4':'&8324;',
	'_5':'&8325;',
	'_6':'&8326;',
	'_7':'&8327;',
	'_8':'&8328;',
	'_9':'&8329;',
	'_+':'&8330;',
	'_-':'&8331;',
	'_=':'&8332;',
	'_(':'&8333;',
	'_)':'&8334;',
	'/sum':'&sum;',
	'/+-':'&mnplus;',
	'/*':'&sdot;',
	'//':'&divide;'
};

function compile() {
	var doc = document.getElementById('document').innerHTML;
	for (var k in keywords) {
		doc = doc.split(k).join(keywords[k]);

	}
	document.getElementById('document').innerHTML = doc;
}

/** Start Shortcut Box **/

function shortcuts() {
	var shortcutBox = document.getElementById("shortcuts");
	if (shortcutBox.style.display == 'block') {
		shortcutBox.style.display = 'none';
	}
	else {
		shortcutBox.style.display = 'block';
	}
}

/** End Shortcut Box **/