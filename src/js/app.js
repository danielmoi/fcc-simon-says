var arrSequence = [];
var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');


$('button').click(function(){
console.log(this.id, addStep());

});

var addStep = function() {
  var num = Math.floor(Math.random()*4) + 1;
  console.log(num);
};

$('#one').click(function() {
  sound1.play();
});

$('#two').click(function() {
  sound2.play();
});

$('#three').click(function() {
  sound3.play();
});

$('#four').click(function() {
  sound4.play();
});
