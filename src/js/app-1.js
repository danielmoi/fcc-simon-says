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
  playSequence();

});

arrSequence = [];
var turn = 'simon';

var playSequence = function() {
// http://tobyho.com/2011/11/03/delaying-repeatedly/
  addStep();
  var queue = arrSequence.slice(0); // make a copy because we are modifying it
  function processNextItem() {
    var nextItem = queue.shift(); // take next item
    if (nextItem) {
      playSound(nextItem); // 3. process this item
      changeColor(nextItem);
      setTimeout(processNextItem, 1000); // 4. pause
    }
  }
  processNextItem();
  console.log('hello');

};

var changeColor = function(num) {
  $('button').removeClass('buzz');
  arrButtons[num].addClass('buzz');
};


var playSound = function(num) {
  arrSounds[num].play();
};


var addStep = function() {
  var num = Math.floor(Math.random() * 4) + 1;
  arrSequence.push(num);

};
var arrGuesses = [];
var addGuess = function(id) {
  arrGuesses.push(id);
  for (var i = 0; i < arrGuesses.length; i++) {
    if (arrGuesses[i] !== arrSequence[i]) {
      console.log('incorrect');
    }
    else {
      console.log('correct');
    }
  }
};

$('#one').on('click', function() {
  addGuess($(this).data('tag'));
  sound1.play();
  $(this).addClass('buzz');
});

$('#two').on('click', function() {
  addGuess($(this).data('tag'));
  sound2.play();
  $(this).addClass('buzz');
});

$('#three').on('click', function() {
  addGuess($(this).data('tag'));
  sound3.play();
  $(this).addClass('buzz');
});

$('#four').on('click', function() {
  addGuess($(this).data('tag'));
  sound4.play();
  $(this).addClass('buzz');
});
