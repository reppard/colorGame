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
  var clip;
  var colorClip;
  var tryAgain;
  var colorSrc;
  var clickBoxes;
  
  function init(){
    document.addEventListener("deviceready", loadMedia, false);
    placeColors();
    clickBoxes = document.getElementsByTagName('color');
    for(var i = 0; i < clickBoxes.length; i++){
      var box = clickBoxes[i];
      box.onclick = function(){
      vibrate();
      checkAnswer(this.className);
      }
    }
  }

  function loadMedia(){
    clip = new Media("", playColor);
    colorClip = new Media("", onSuccess);
  }

  function vibrate(){
    navigator.notification.vibrate(50);
  }

  function playAudio(src){
	  clip["src"] = src;
	  clip.play();
  }

  function playColor(){
  	if (colorSrc != null){
  	  colorClip["src"] = colorSrc;
      colorClip.stop();
  	  colorClip.play();
  	}
  }

  function onSuccess(){
    colorClip.release();
  }
  function onError(){
  	navigator.notification.alert("OH NO!");
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
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady(){
    	playAudio("\/android_asset\/www\/sounds\/clickthe.mp3");
        colorSrc = "\/android_asset\/www\/sounds\/" + goal + ".mp3"
    }
    document.getElementById('goal').innerHTML="Click the " + goal + " box."
  };

  var checkAnswer = function(boxColor){
    if (boxColor === goal){
      document.getElementById('message').innerHTML="Good Job!";
      placeColors();
    }else{
      document.getElementById('message').innerHTML="Try Again!";
      colorSrc = "\/android_asset\/www\/sounds\/tryagain.mp3";
      playColor();
    }
  }


