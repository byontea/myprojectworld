
var colorebottoni = ["verde", "giallo", "rosso", "blu"];
var sceltecomputer = [];
var sceltagiocatere = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#titolodinamico").text("Level " + level);
    estrazione();
    started = true;
  }
});


$(".btn").click(function() {
  var sceltacoloreutente = $(this).attr("id");
  sceltagiocatere.push(sceltacoloreutente);

  animazionetasto(sceltacoloreutente);
  suonapulsante(sceltacoloreutente);

  verificasoluzione(sceltagiocatere.length-1);
});


function verificasoluzione(partitacorrente) {
  if (sceltecomputer[partitacorrente] === sceltagiocatere[partitacorrente]) {
    if (sceltagiocatere.length === sceltecomputer.length) {
      setTimeout(function() {
        estrazione();
      }, 1000);
    }
  } else {
    suonapulsante("sbagliato");
    $("body").addClass("game-over");
    $("#titolodinamico").text("Hai perso, premi un pulsante per ricominciare");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    ricomincia();

  }
}

function estrazione() {
  sceltagiocatere = [];
  level++;
  $("#titolodinamico").text("Level" + level);
  var generanumero = Math.floor(Math.random() * 4);
  var pescacolore = colorebottoni[generanumero];
  sceltecomputer.push(pescacolore);
  $("#" + pescacolore).fadeIn(100).fadeOut(100).fadeIn(100);
  suonapulsante(pescacolore);
}


function animazionetasto(cccc) {
  $("#" + cccc).addClass("pressed");
  setTimeout(function() {
    $("#" + cccc).removeClass("pressed");
  }, 100);
}

function suonapulsante(ddd) {
  var audio = new Audio("sounds/" + ddd + ".mp3");
  audio.play();
}


function ricomincia() {
  level = 0;
  sceltecomputer = [];
  started = false;
}
