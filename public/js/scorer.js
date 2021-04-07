var socket = io();

var messages = document.getElementById('messages');
var home_plus = document.getElementById('home-plus');
var home_minus = document.getElementById('home-minus');
var away_plus = document.getElementById('away-plus');
var away_minus = document.getElementById('away-minus');
var home_score = document.getElementById('home-score');
var away_score = document.getElementById('away-score');
var kill_play = document.getElementById('kill');
var ace_play = document.getElementById('ace');
var block_play = document.getElementById('block');
var dig_play = document.getElementById('dig');
var to_play = document.getElementById('timeout');
var team = window.location.pathname.split('/')[1];
var chatc = team + '-chat message';
var scorec = team + '-scoreboard';

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

kill_play.addEventListener("click", function(e) {
  e.preventDefault();
  send_play('Kill');
}); 

ace_play.addEventListener("click", function(e) {
  e.preventDefault();
  send_play('Ace');
}); 

block_play.addEventListener("click", function(e) {
  e.preventDefault();
  send_play('Block');
}); 

dig_play.addEventListener("click", function(e) {
  e.preventDefault();
  send_play('Dig');
}); 

to_play.addEventListener("click", function(e) {
  e.preventDefault();
  send_play('Timeout');
}); 

function update_score () {
  var score = home_score.value + "-" + away_score.value;
  socket.emit(scorec, score);
}

function send_play (play) {
  var message = "PLAY: " + play;
  var playerlist = document.getElementById('standard-select');
  message += " by " + playerlist.options[playerlist.selectedIndex].text;
  socket.emit(chatc, message);
}

socket.on(chatc, function(msg) {
  var item = document.createElement('li');
  if (msg.startsWith("PLAY:")) {
    item.className = "play";
  }
  item.textContent = msg;
  messages.prepend(item);
  window.scrollTo(0, 0);
});
