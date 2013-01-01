  var colors = [
    'blue',
    'red',
    'green',
    'yellow',
    'black',
    'brown',
    'purple',
    'pink',
    'orange',
    'grey' ];
    
  var goal;
  var clip = null;
  var tryAgain = null;
    
  function playAudio(src){
	clip = new Media(src, onSuccess);
	clip.play();
  }  
  
  function onSuccess(){
  	setTimeOut(function(){ clip.release(); }, 500);
  }
  
  var getColors = function(colors){
    var fourColors = [];
    while(fourColors.length != 4 ){
      var random = Math.floor(Math.random()*colors.length);
      var select = colors[random];
      if(fourColors.indexOf(select) === -1 ){
      fourColors.push(select);
      }
      select = "";
    }
    return fourColors;
  };

  var placeColors = function(){
    var set = getColors(colors);
    for (i = 0; i < set.length; i++){
      var num = (i + 1).toString();
      document.getElementById('color' + num).style.backgroundColor = set[i];
      document.getElementById('color' + num).className= set[i];
    }
    goal = set[Math.floor(Math.random()*set.length)];
    document.addEventListener("deviceready", onDeviceReady, true);
    function onDeviceReady(){
    	playAudio("/android_asset/www/sounds/clickthe.mp3");
        setTimeout(function () { playAudio("/android_asset/www/sounds/" + goal + ".mp3"); },500);
    }
    document.getElementById('goal').innerHTML="Click the " + goal + " box."
  };

  var checkAnswer = function(boxColor){
    if (boxColor === goal){
      document.getElementById('message').innerHTML="Good Job!";
      placeColors();
    }else{
      document.getElementById('message').innerHTML="Try Again!";
      tryAgain = new Media("/android_asset/www/sounds/tryagain.mp3");
      tryAgain.play();
      tryAgain.release();
    }
  }

window.onload = function(){
  placeColors();
  var clickBoxes = document.getElementsByTagName('color');
  for(var i = 0; i < clickBoxes.length; i++){
    var box = clickBoxes[i];
    box.onclick = function(){
      checkAnswer(this.className);
    }
  }
};
