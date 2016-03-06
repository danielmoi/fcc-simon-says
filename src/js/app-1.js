//////////////////
//
// Simon 5000
//
// by Daniel Moi Feb 2016


////////////////
// Set up variables
var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var soundWrong = new Audio('audio/beep1.mp3');

var arrSounds = {
  1: sound1,
  2: sound2,
  3: sound3,
  4: sound4
};

var arrButtons = {
  1: $('#one'),
  2: $('#two'),
  3: $('#three'),
  4: $('#four')
};

var arrGuesses = [];
var arrSequence = [];

var turn = 'simon';
var count = 0;
var strictMode;
var gameActive = false;
var powerOn = false;
var gameMax = 3;

///////////////////////////
// Light up the guess buttons
var addBuzz = function(num) {
  // $('button').removeClass('buzz');
  // console.log('addBuzz');
  arrButtons[num].addClass('buzz');
};

var removeBuzz = function() {
  $('button').removeClass('buzz');
};

var delayContainer = function() {
  var myDelay = setTimeout(removeBuzz, 400);
};

// Play sound
var playSound = function(num) {
  arrSounds[num].play();
};




////////////////////////
// Logic - Game Controls

// Reset
var reset = function() {
  powerOn = false;
  gameActive = false;
  arrSequence = [];
  arrGuesses = [];
  $('.count').text(0);
  displayMessage('Switch Simon ON!');
  $('#game-toggle').prop('checked', false);
  $('#strict-id').prop('checked', false);
  $('#strict-id').prop('disabled', false);
};

// Start
var start = function() {
  gameActive = true;
  $('#game-toggle').prop('checked', true);
  $('#strict-id').prop('disabled', true);
  setTimeout(addStep, 2000);
  setTimeout(playSequence, 2000);

};

// Go button
$('#go').on('click', function() {
  if (gameActive === false) {
    displayWin('');
    displayMessage('Listen carefully!');
    start();
  }
});


/////////////////////////
// Update user interface
var displayCount = function() {
  var count = arrSequence.length;
  $('.count').text(count);
};

var delayCount = function() {
  setTimeout(displayCount, 1500);
};

var displayMessage = function(str) {
  $('.message').text(str);
};

var displayWin = function(str) {
  $('.win').text(str);
};

//////////////////////////
// Logic - Add step

var addStep = function() {
  var num = Math.floor(Math.random() * 4) + 1;
  arrSequence.push(num);
  if (arrSequence.length === 1) {
    $('.count').text(1);
  } else {
    delayCount();
  }
};

// Logic – Guess Checking
var checkGuess = function(id) {
  if (turn === 'player') {

    // If guess is correct
    if (id === arrSequence[count]) {
      arrGuesses[count] = id;
      console.log('correct');
      count += 1;
      if (count === arrSequence.length) {
        displayMessage('Well done. Simon will add one more.');
        console.log('now for simon');

        // Check if gameMax is reached
        if (count === gameMax) {
          displayWin('You win!');
          reset();
        }

        // Else, continue game
        else {
          turn = 'simon';
          addStep();
          setTimeout(playSequence, 1500);
        }
      }
    }

    // If guess is incorrect
    else {
      console.log('incorrect');
      displayMessage('Nup. That wasn\'t it.');
      soundWrong.play();

      // Incorrect in strict mode will reset game
      if (strictMode) {
        reset();
      }
      // Incorrect in normal mode will continue game
      else {
        setTimeout(playSequence, 1500);
      }
    }
    console.log('arrSequence: ', arrSequence, 'arrGuesses: ', arrGuesses);

  }
};

/////////////////////////
// Play Sequence
var playSequence = function() {
  // http://tobyho.com/2011/11/03/delaying-repeatedly/
  displayMessage('Listen carefully!');
  var queue = arrSequence.slice(0); // make a copy because we are modifying it
  function processNextItem() {
    var nextItem = queue.shift(); // take next item
    if (nextItem) {
      playSound(nextItem); // 3. process this item
      addBuzz(nextItem);
      delayContainer();
      setTimeout(processNextItem, 1000); // 4. pause
      // console.log('after setTimeout');
    } else {
      console.log('now for player');
      turn = 'player';
    }
  }
  processNextItem(); // this runs just once
  // console.log('after processNextItem');
  count = 0;

};

//////////////////////////
// User Interface Controls

$('.button-guess').on('click', function() {
  if (turn === 'player' && gameActive) {
    checkGuess($(this).data('tag'));
    arrSounds[$(this).data('tag')].play();
    // $(this).addClass('buzz');
    addBuzz($(this).data('tag'));
    delayContainer();
  }
});

$('#strict-id').on('change', function() {
  strictMode = $(this).prop('checked');
});

$('#game-toggle').on('change', function() {
  if ($(this).prop('checked')) {
    displayMessage('Click GO to start!');
    powerOn = true;
  } else {
    reset();
  }
});
