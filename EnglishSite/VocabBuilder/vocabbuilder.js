var vocab = ["apple", "cherry", "grapes", "lemon", "orange", "pear"];

var wordcard = "nothing";
var piccard = "nothing";
var score = 0;
var time = 60;
var wordsremaining;
var stop = false;

function startgame() {

	createFlashcards();
	clock();
}

function createFlashcards() {
	wordsremaining = vocab.length;
	vocab = shuffleArray(vocab);
	for (var i = 0; i < vocab.length; i++) {
		var word = vocab[i];
		$("#gamearea1").append("<div id='" + word + "' class='pictureCard'><img src='img/" + word + ".png'></div>");
	}
	vocab = shuffleArray(vocab);
	for (var i = 0; i < vocab.length; i++) {
		var word = vocab[i];
		$("#gamearea1").append("<div id='" + word + "' class='wordCard'><p class='targetWord'>" + word + "</p></div>");
	}

	$(".wordCard, .pictureCard").click(function() {

		if (stop) {
			return;
		}

		var id = $(this).attr('id');
		var classname = $(this).attr('class');

		if (classname == "wordCard") {
			wordcard = id;
		} else {
			piccard = id;
		}

		if (wordcard == piccard) {
			var mySound = new buzz.sound("sounds/coin", {
				formats : ["mp3"]
			});
			mySound.play();

			$("#" + wordcard).remove();
			$("#" + piccard).remove();

			score++;

			wordcard = "nothing";
			piccard = "nothing";
			wordsremaining--;
		} else if (wordcard == "nothing" || piccard == "nothing") {
			var mySound = new buzz.sound("sounds/clickSound", {
				formats : ["mp3"]
			});
			mySound.play();
		} else {
			var mySound = new buzz.sound("sounds/noMatchSound", {
				formats : ["mp3"]
			});
			mySound.play();

			wordcard = "nothing";
			piccard = "nothing";

			score--;
		}

		$("#score").text(score);

		if (wordsremaining == 0) {
			createFlashcards();
		}

	});
}

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function clock() {
	var timerid = setInterval(function() {
		$("#time").text(--time);
		if (time == 0) {
			clearInterval(timerid);
			$("#time").text("Time up!");
			stop = true;
		}
	}, 1000);
}