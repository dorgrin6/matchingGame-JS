var numOfFaces = 5;
var level = 0;

function createSmiley(){
  var ret = document.createElement("img");
  ret.src="smile.png";
  var left = Math.floor(Math.random()*400);
  var top = Math.floor(Math.random()*400);
  ret.style.left = left + 'px';
  ret.style.top = top + 'px';

  return ret;
}

function clearDivs(){
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
  document.getElementById("stats").innerHTML = "Level:"+level +" Smileys:"+numOfFaces;
}

function generateFaces(){
  var theLeftSide = document.getElementById("leftSide");
  var theRightSide = document.getElementById("rightSide");
  var theBody = document.getElementsByTagName("body")[0];

  //update user stats
  updateStats();


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
  theLeftSide.lastChild.onclick=  function nextLevel(event){

        event.stopPropagation();
        numOfFaces += 5;
        level++;

        clearDivs();
        generateFaces();

      };

  theBody.onclick = function gameOver(){
      alert("GameOver!!!\nYou've reached level "+level);
      theBody.onclick = null;
      theLeftSide.lastChild.onclick = null;

  };



}
