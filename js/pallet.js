var pallet = document.getElementById('pallet');
var open = document.getElementById("openPallet");
var exit = document.getElementsByClassName("exit")[0];
open.onclick = function() {
     pallet.style.display = 'flex';
}
exit.onclick = function() {
     pallet.style.display = 'none';
}
window.onclick = function(event) {
     if (event.target == pallet) {
          pallet.style.display = 'none';
     }
}

window.onload = function() {
     let root = document.documentElement;
     var colors = document.querySelectorAll('#colors input');
     for(var i = 0; i < colors.length; i++) {
          colors[i].addEventListener('change', function () {
               root.style.setProperty('--' + this.name, this.value);
          });
     }
}
