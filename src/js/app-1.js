var arrSequence = [];
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

$('#go').on('click', function() {
  if (arrSequence.length === 0) {
    start();
    gameStarted = true;
    $('#game-toggle').prop('checked', true);
    $('#strict-id').prop('disabled', true);
  }
});

arrSequence = [];
var turn = 'simon';
var count = 0;
var strictMode;
var gameStarted;

var playSequence = function() {
  // http://tobyho.com/2011/11/03/delaying-repeatedly/
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

var playSound = function(num) {
  arrSounds[num].play();
};


var addStep = function() {
  var num = Math.floor(Math.random() * 4) + 1;
  arrSequence.push(num);
  if (arrSequence.length === 1) {
    $('.count').text(1);
  } else {
    delayCount();
  }
};

var reset = function() {
  arrSequence = [];
  arrGuesses = [];
  $('.count').text(0);
  $('#strict-id').prop('checked', false);
  $('#strict-id').prop('disabled', false);


};

var start = function() {
  setTimeout(addStep, 2000);
  setTimeout(playSequence, 2000);
};


var displayCount = function() {
  var count = arrSequence.length;
  $('.count').text(count);
};

var delayCount = function() {
  setTimeout(displayCount, 1500);
};

var arrGuesses = [];
var checkGuess = function(id) {
  if (turn === 'player') {
    if (id === arrSequence[count]) {
      arrGuesses[count] = id;
      console.log('correct');
      count += 1;
      if (count === arrSequence.length) {
        console.log('now for simon');
        turn = 'simon';
        addStep();
        setTimeout(playSequence, 1500);
      }
    } else {
      console.log('incorrect');
      soundWrong.play();
      if (strictMode) {
        reset();

      } else {
        setTimeout(playSequence, 1500);
      }
    }
    console.log('arrSequence: ', arrSequence, 'arrGuesses: ', arrGuesses);

  }
};

$('button').on('click', function() {
  if (turn === 'player' && gameStarted) {
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
    gameStarted = true;
  } else {
    gameStarted = false;
    reset();
  }


});
