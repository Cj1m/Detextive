var latestInput; //used to check for input
var previousInput;
var clearTextTimer = null;
var timer;
var timesRun = 0;
var textOnScreen = "";
var previousAct = 0;

var i = 0,
    isTag=false,
    text;
var typeTime = 55; /*Very fast for immediate results, good reading speed is 45*/

//<GAME VARIABLES!!!>
var name;
var secondActResponse;
var usrLocation = "Train Station";
var isGameover = false;
//</GAME VARIABLES!!!>

//Initialize listeners etc
$( document ).ready(function() {
  timer = setInterval(fixSizes, 1);
  $("#inputTextMain")[0].onkeypress = printText;
  $("#inputTextNotes").keypress(printNotes);

  $(".invBlood").hide();
  $(".invBloodyKnife").hide();
  $(".invHair").hide();
  $(".invKnife").hide();

  $("#mapImage").draggable({
      stop: function(event, ui) {
        mapWidth = $("#mapImage").width() -  $("#map").width();
        mapHeight = $("#mapImage").height() -  $("#map").height();

        if(ui.position.left>0){
          $("#mapImage").animate({"left": "0px"},{ queue: false, duration: 300 });
        }else if(ui.position.left<-mapWidth){
          $("#mapImage").animate({"left": "-"+mapWidth+"px"},{ queue: false, duration: 300 });
        }

        if(ui.position.top > 0){
          $("#mapImage").animate({"top": "0px"},{ queue: false, duration: 300 });
        }else if(ui.position.top < -mapHeight){
          $("#mapImage").animate({"top": "-"+mapHeight+"px"}, { queue: false, duration: 300 });
        }
    }, scroll: false });

  setZoomListener();
});

$(window).resize(fixSizes);

//Set up zooming in and out of map
function setZoomListener(){
  var imageOfMap = document.getElementById("mapImage");
  //Multi-browser support
  if (imageOfMap.addEventListener) {
	   imageOfMap.addEventListener("mousewheel", MouseWheelHandler, false);
	   imageOfMap.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
  }else{
     imageOfMap.attachEvent("onmousewheel", MouseWheelHandler);
  }
}

//Handler for scroll wheel
function MouseWheelHandler(e){
  var e = window.event || e;
  var delta = e.wheelDelta / 120 * 50;

  var imageOfMap = document.getElementById("mapImage");
  imageOfMap.style.width = Math.max(797, Math.min(1500,imageOfMap.width + delta)) + "px";
  imageOfMap.style.left = 1 + "px";
  imageOfMap.style.height = Math.max(584, Math.min(1287,imageOfMap.height + delta)) + "px";

  return false;
}

//Adjusts element sizes according to screen size
function fixSizes(){
  mapContainer = document.getElementById("map");
  padder = document.getElementById("breaker");
  mainRect = document.getElementById("mainContainer");
  size = (map.clientHeight * 2 + 30 + padder.clientHeight);
  mainRect.style.height = size + "px";

  timesRun++;
  if(timesRun > 5){
    clearInterval(timer);
  }
}


//Called once, types while queue is not empty
function type() {

    if (text === textOnScreen){
      setTimeout(function(){type();}, typeTime);
      return;
    }


    text = textOnScreen.slice(0, i+1);
    i++;
    var elem = document.getElementById('paraText');

    elem.innerHTML = text;

    var char = text.slice(-1);

    if( char === '<' ) isTag = true;
    if( char === '>' ) isTag = false;
    elem.scrollTop = elem.scrollHeight;
    if (isTag) return type();
    setTimeout(function(){type();}, typeTime);
}

//Add text to typing queue
function addTextToScreen(textForScreen){
  textOnScreen = textOnScreen + textForScreen;
}

//Skip typing just display text
function skipTyping(){
  i = textOnScreen.length - 1;
  text = textOnScreen.slice(0,i);
}

//Get text on screen
function getPrintedText(){
  return elem = document.getElementById('paraText').innerHTML;
}

//Receives user input and adds to screen
function printText(event) {
  if(event.keyCode == 13){
      printMainText = document.getElementById("inputTextMain").value;
      if(!isGameover){
        if(printMainText != ""){
          addTextToScreen("<i>" + printMainText + "</i><br>");
          latestInput = printMainText.toLowerCase();
          x = document.getElementById("inputTextMain");
          x.value = "";
          showInvBlood(latestInput);
          showInvHair(latestInput);
          showInvKnife(latestInput);
          startNextPartOfAct();
        }else{
          skipTyping();
        }
      }
  }
}

//Used to print notes in the notes section (bottom right)
function printNotes(event) {
  if(event.keyCode == 13){
    var x = document.getElementById("inputTextNotes");
      if(x.value != ""){
        var printNotesText = document.getElementById("inputTextNotes").value;
        var inputText = "&bull;" + printNotesText + "<br />";
        var elem = document.getElementById('notesText');
        elem.innerHTML += inputText;
        elem.scrollTop = elem.scrollHeight;
        x.value = "";
      }
  }
}

function showInvBlood(word) {
  if(word == "pick up blood sample") {
    $(".invBlood").show();
  }
}

function showInvBloodyKnife(word) {
  if(word == "pick up the bloody knife") {
    $(".invBloodyKnife").show();
  }
}

function showInvHair(word) {
  if(word == "pick up hair sample") {
    $(".invHair").show();
  }
}

function showInvKnife(word) {
  if(word == "pick up the knife") {
    $(".invKnife").show();
  }
}

//Before input
function startNextAct(){
  if(previousAct == 1){
    secondAct(true);
    previousAct = 2;
  }else if(previousAct == 2){
    thirdAct(true);
    previousAct = 3;
  }else if(previousAct == 3){
    fourthAct(true);
    previousAct=4;
  }else if(previousAct == 4){
    fifthAct(true);
    previousAct=5;
  }
}

//After input
function startNextPartOfAct(){
  if(previousAct == 0){
    firstAct();
    previousAct = 1;
    previousInput = latestInput;
    startNextAct();
  }else if(previousAct == 2){
    secondAct(false);
  }else if(previousAct == 3){
    thirdAct(false);
  }else if(previousAct == 4){
    fourthAct(false);
  }else if(previousAct == 5){
    fifthAct(false);
  }
}

//Used to clear text from screen
function clearText(){
  var currentText = textOnScreen;
    var thread = setInterval(function(){
        if(currentText === getPrintedText()){
          textOnScreen = textOnScreen.substring(currentText.length);
          console.log(currentText.length);
          text = "";
          i=0;
          document.getElementById('paraText').innerHTML = "";
          clearInterval(thread);
        }
    },1);
}


//ACTS
function firstAct(){
  name = latestInput;
  addTextToScreen('<p style="font-family:munro">"Ah, well it\'s a pleasure to meet you ' + name + '"</p>            ');
  addTextToScreen('<p style="font-family:munro">"Now, down to this case of yours. As you may already know there has been a string of murders here in Sandyford - 3 to be precise. Each murder has happened 1 day after the last. If this pattern continues, there will be a murder tomorrow night. Your job is to find out whoever is behind this and get them behind bars before there is no one left in this bloody town to save."</p>');
  addTextToScreen('<p style="font-family:munro">"Good luck detective.       I know you won\'t let me down."             </p>');
}

function secondAct(first){
  if(first == true){
    clearText();
    addTextToScreen('<p style="font-family:munro"><u>Chapter 1:       The Town</u></p>            ');
    addTextToScreen('<p style="font-family:munro">"It must have been a long journey down here, perhaps you\'d like to turn in for the night. There is a fantastic hotel a few streets away from here, I can give you directions if you\'d like."</p>');

  }else{
    var directionsResponse;
    var validResponse = true;
    switch(yesorno(latestInput)) {
      case "yes":
          directionsResponse = '<p style="font-family:munro">Sure. It\'s on Peveril Avenue, to get there turn left at the top of this road, then take the third right and you should see it. It\'s called the Beacon Hotel.</p>  ';
          secondActResponse = "y";
          break;
      case "no":
          directionsResponse = '<p style="font-family:munro">Looks like you still got some energy inside of you. How about you visit the local pub. You could get to know some of the locals and relax before you get to work on this case of yours. The pub is just round the corner on Iser Lane, you should be able to see it on that map of yours.</p>';
          secondActResponse = "n";
          break;
      case "undef":
          directionsResponse = '<p style="font-family:munro">Sorry, I don\'t quite understand what you are saying.</p>';
          validResponse = false;
          break;
    }

    addTextToScreen(directionsResponse);

    if(validResponse){
      startNextAct();
    }
  }

}

function thirdAct(first){
  if(first == true){
    var response;
    switch(secondActResponse){
      case "y":
        response = '<p style="font-family:munro">Well, I\'ll leave you to it. Just make sure you GO TO the correct address. The map may be of some use when checking street names.</p>'
        break;
      case "n":
        response = '<p style="font-family:munro">Right, well, I\'ll leave you to it. As I said, you should GO TO the pub and meet the locals.</p>'
        break;
    }
    addTextToScreen(response);
  }else{
    var validResponse = true;
    switch(latestInput){
      case "go to iser lane":
        usrLocation = "iser lane";
        break;
      case "go to peveril avenue":
        usrLocation = "peveril avenue";
        addTextToScreen('<p style="font-family:munro">You arrive at the Beacon Hotel. The place looks aged and worn, but it should do you for tonight. As you walk inside you are greeted by an old man in a suit.</p>');
        addTextToScreen('<p style="font-family:munro">   \'Welcome to the Beacon Hotel, detective, you\'ve been booked in by your chief, I\'ll show you to your room\'</p>');
        addTextToScreen('<p style="font-family:munro">    You follow the man up the stairs and along a narrow hallway</p>');
        addTextToScreen('<p style="font-family:munro">    \'Here we are, room number 42. I trust you are tired from your journey, so I will leave you be. I\'ll be in the lobby if you are in need of my service.\'</p>');
        addTextToScreen('<p style="font-family:munro">    You drop your luggage and hang up your coat. You look at the clock, it\'s 23:40. You decide to turn in for the night, knowing that you have a long day ahead of you tomorrow. You get into bed and quickly fall asleep.</p>');
        break;
      default:
        addTextToScreen('<p style="font-family:munro">I don\'t think that place exists.</p>');
        validResponse = false;
        break;
    }

    if(validResponse){
      startNextAct();
    }
  }
}

function fourthAct(first){
  if(first){
    if(usrLocation == "peveril avenue"){
      addTextToScreen('<p style="font-family:munro">                                                    .        .        .</p>');
      addTextToScreen('<p style="font-family:munro">                .        .        .</p>');
      addTextToScreen('<p style="font-family:munro">                .        .        .</p>');
      addTextToScreen('<p style="font-family:munro">                                                        *SCREAM*</p>');
      addTextToScreen('<p style="font-family:munro">You are awoken by the sound of a scream from a woman in the room across from yours.</p>');
      addTextToScreen('<p style="font-family:munro">     What do you do?</p>');
    }else{
      //AT THE PUB!
    }
  }else{
    if(usrLocation == "peveril avenue"){
      var validResponse = true;
      switch(latestInput){
        case "stay in bed":
          addTextToScreen('<p style="font-family:munro">    You close your eyes and slowly drift back to sleep. As you are about to nod of you feel a piercing agony in your chest, you look, someone has stabbed you in the heart. "Go back to sleep" you hear a man\'s voice say softly, before losing your consciousness...</p>');
          gameover();
          break;
        case "investigate":
          addTextToScreen('<p style="font-family:munro">    Feeling uneasy about your decision, you decide to get up and investigate the situation.</p>');
          break;
        default:
          validResponse = false;
          addTextToScreen('<p style="font-family:munro">That is not an option at this time!</p>');
          break;
      }

    }else{
      //AT THE PUB!
    }

    if(validResponse){
      startNextAct();
    }
  }
}

function fifthAct(first){
if(first == true){
  addTextToScreen('<p style="font-family:munro">    You grab your trousers and hastely put them on. You leave your room and cautiosly approach the door from where you heard the scream.</p>');
  addTextToScreen('<p style="font-family:munro">                 *Cre    e    e    e    a    a    a    a    ak*</p>');
  addTextToScreen('<p style="font-family:munro">    A cold gush of wind hits your face, you are blinded for a split second from the cold shock. You catch a glimse of a tall, slennder figure hopping out of the opposing window. In an attempt to catch him you race to the window and look out,     but all you see is the dark town below you -       he is no where to be seen.</p>');
  addTextToScreen('<p style="font-family:munro">    You turn around to see the body of a young woman lying in a pool of her own blood - her neck sliced open, still sparying the sheets and walls that which surround her.</p>');
  addTextToScreen('<p style="font-family:munro">    You rip a certain from the window and rush to the young woman. You apply an amence amount of pressure on her neck with the curatin in the hopes that it may stop the bleeding. Yet it is too late to save her, as you check her pulse to find that she has none.</p>');
}else{
      if(usrLocation == "peveril avenue"){
          var validResponse = true;
          switch(latestInput){
            case "search the body":
              addTextToScreen('<p style="font-family:munro">    You decide it\'s time to do your job. You whip out your leather gloves from your back pocket and search to body for any clues.</p>');
              addTextToScreen('<p style="font-family:munro">    Immediately you see the perpetrator\'s murder weapon, a kitchen knife -     drenched in blood.      You pick it up</p>');
              showInvBloodyKnife("pick up the bloody knife");
              addTextToScreen('<p style="font-family:munro">    It\'s too dark to find any other samller clues that may be of valuable use. You leave the room and you are swarmed by the guests at the hotel. You tell the that there has been a murder but not to worry as the suspect is long, long away.</p>');
              break;
            case "leave":
              addTextToScreen('<p style="font-family:munro">    You are too tired to begin onvestiagting the body and leave it \'til tomorrow morning. You leave the room and you are swarmed by the guests at the hotel. You tell the that there has been a murder but not to worry as the suspect is long, long away.</p>');
              break;
            default:
              validResponse = false;
              addTextToScreen('<p style="font-family:munro">That is not an option at this time!</p>');
              break;
          }
          if(validResponse){
            startNextAct();
          }
        }
    }
}


//Runs on startup, no touchy!
type();
addTextToScreen('<h2 id="title" style="font-family:neb">Detextive...               It is time to begin your story.</h2>                                           ');
clearText();
addTextToScreen('<p style="font-family:munro">"Welcome to Sandyford Detective-       uh,    I never caught your name.      I\'m Chief Burns,      you are?"</p>');

//Game mechanics
function gameover(){
  isGameover = true;
  addTextToScreen("It appears you have DIED!!! Press F5 to restart!");
}

//Text analysis
function yesorno(word){
  word = word.toLowerCase();
  if(word.indexOf("no") > -1){
    return 'no';
  }else if(word.indexOf("yes") > -1 || word.indexOf("yeah") > -1){
    return 'yes';
  }else{
    return 'undef';
  }
}
