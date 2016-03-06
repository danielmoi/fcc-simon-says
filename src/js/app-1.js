var arrSequence = [];
var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

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

$('#go').click(function() {
  addStep();
  playSequence();

});

arrSequence = [];
var turn = 'simon';
var count = 0;

var playSequence = function() {
// http://tobyho.com/2011/11/03/delaying-repeatedly/
  var queue = arrSequence.slice(0); // make a copy because we are modifying it
  function processNextItem() {
    var nextItem = queue.shift(); // take next item
    if (nextItem) {
      playSound(nextItem); // 3. process this item
      changeColor(nextItem);
      delayContainer();
      setTimeout(processNextItem, 1000); // 4. pause
      console.log('after setTimeout');
    }
  }
  processNextItem(); // this runs just once
  console.log('after processNextItem');
  count = 0;

};

var changeColor = function(num) {
  $('button').removeClass('buzz');
  console.log('changeColor');
  arrButtons[num].addClass('buzz');
};

var removeColor = function() {
  $('button').removeClass('buzz');
};

var delayContainer = function () {
  var myDelay = setTimeout(removeColor, 400);
};

var playSound = function(num) {
  arrSounds[num].play();
};


var addStep = function() {
  var num = Math.floor(Math.random() * 4) + 1;
  arrSequence.push(num);

};
var arrGuesses = [];
var checkGuess = function(id) {
  if (id === arrSequence[count]) {
    arrGuesses[count] = id;
    console.log('correct');
    count += 1;
  }
  else {
    console.log('incorrect');
    setTimeout(playSequence, 1000);
  }
  console.log('arrSequence: ', arrSequence, 'arrGuesses: ', arrGuesses);

};

$('#one').on('click', function() {
  checkGuess($(this).data('tag'));
  sound1.play();
  $(this).addClass('buzz');
});

$('#two').on('click', function() {
  checkGuess($(this).data('tag'));
  sound2.play();
  $(this).addClass('buzz');
});

$('#three').on('click', function() {
  checkGuess($(this).data('tag'));
  sound3.play();
  $(this).addClass('buzz');
});

$('#four').on('click', function() {
  checkGuess($(this).data('tag'));
  sound4.play();
  $(this).addClass('buzz');
});
