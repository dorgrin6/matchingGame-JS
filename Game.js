/*
    Dor Grinshpan, 30/10/2016.
    dorgrin6@gmail.com
*/
var numOfFaces = 5;
var level = 0;
var score = 0;

function createSmiley(){ //function creates a smiley face and assigns random location
  var ret = document.createElement("img");
  ret.src="smile.png";
  //set random values to location
  var left = Math.floor(Math.random()*400);
  var top = Math.floor(Math.random()*400);
  ret.style.left = left + 'px';
  ret.style.top = top + 'px';
  //TODO remove possibility for complete intersection

  return ret;
}

function clearFaces(){ // function clears all faces from divs
  var theLeftSide = document.getElementById("leftSide");
  var theRightSide = document.getElementById("rightSide");

  while (theLeftSide.firstChild) {
    theLeftSide.removeChild(theLeftSide.firstChild);
  }
  while (theRightSide.firstChild) {
    theRightSide.removeChild(theRightSide.firstChild);
  }
}

function updateStats(){
  document.getElementById("stats").innerHTML = "Level:"+level +" Smileys:"+numOfFaces
    +" Score:"+score;
}

function generateFaces(){ //sets the faces inside divs, inits game
  var theLeftSide = document.getElementById("leftSide");
  var theRightSide = document.getElementById("rightSide");
  var theBody = document.getElementsByTagName("body")[0];

  //update user stats
  updateStats();
  //setCountdown();

  //append smileys to left
  for (var i=0; i<numOfFaces; i++){
    //create smiley image
    var smiley = createSmiley();
    theLeftSide.appendChild(smiley);
  }

  //append smileys to right
  var leftSideImages = theLeftSide.cloneNode(true);
  leftSideImages.removeChild(leftSideImages.lastChild);

  //add the left images to the right one
  theRightSide.appendChild(leftSideImages);


  //check next level
  theLeftSide.lastChild.onclick = function nextLevel(event){

        event.stopPropagation();
        numOfFaces += 5;
        level++;
        score += 10;

        clearFaces();
        generateFaces();

      };

  theBody.onclick = function gameOver(){
      var theLeftSide = document.getElementById("leftSide");
      var theBody = document.getElementsByTagName("body")[0];
      alert("GameOver!!!\nYou've reached level "+level+"\nScore:"+score);
      theBody.onclick = null;
      theLeftSide.lastChild.onclick = null;
  };
}


function setCountdown(){
    var countdown = setInterval(function () {
    var d = new Date();
    //get num of seconds in total
    var seconds = d.getMinutes() * 60 + d.getSeconds(); //convert 00:00 to seconds
    var startTime = 60; //total start time

    var timeLeft = startTime - seconds % startTime;

    //time ended
    if (timeLeft <= 1){
        clearInterval(countdown);
        //gameOver();
    }

    var result = parseInt(timeLeft / 60) + ':' + timeLeft % 60; //format seconds into 00:00
    document.getElementById("countdown").innerHTML = result;
  }, 500)//calling it every 0.5 second to do countdown
}
