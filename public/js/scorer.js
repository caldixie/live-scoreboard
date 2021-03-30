var socket = io();

var messages = document.getElementById('messages');
var home_plus = document.getElementById('home-plus');
var home_minus = document.getElementById('home-minus');
var away_plus = document.getElementById('away-plus');
var away_minus = document.getElementById('away-minus');
var home_score = document.getElementById('home-score');
var away_score = document.getElementById('away-score')

home_plus.addEventListener("click", function(e) {
  e.preventDefault();
  home_score.value++;
  update_score();
});     

home_minus.addEventListener("click", function(e) {
  e.preventDefault();
  if (home_score.value > 0) { home_score.value--; } else { home_score.value = 0; }
  update_score();
});     

away_plus.addEventListener("click", function(e) {
  e.preventDefault();
  away_score.value++;
  update_score();
});     

away_minus.addEventListener("click", function(e) {
  e.preventDefault();
  if (away_score.value > 0) { away_score.value--; } else { away_score.value = 0; }
  update_score();
});     

function update_score () {
  var score = home_score.value + "-" + away_score.value;
  socket.emit('scoreboard', score);
}

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.prepend(item);
  window.scrollTo(0, 0);
});
