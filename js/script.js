function test(param) {
    console.log(param || "test");
}

const container = document.getElementById("inside-changer");
const section = document.createElement("Section");
const question = document.getElementsByClassName("question")[0];
const questionGerne = document.getElementById("question-gerne");
const fragenAnzeige = document.getElementById("fragen-anzeige");
const upperText = document.getElementById("upper-Text");

var allButtons;
var targetVal;
var button1; 
var button2; 
var button3;  
var button4;   

var punkte = document.getElementById("punkte");
var fragencount = document.getElementById("fragenCount");
var score = 0;
var fragencounter = 0;


function checkForPoints(event) {
        targetVal = event.target.innerText;
    if (targetVal === "Submit")
        {targetVal = document.getElementById("inputOfGq").value;}

    if (targetVal === questions[0].correct){
        score += 10;
        fragencounter += 1;
        punkte.innerText = score;
        fragencount.innerText = fragencounter;
        questions.shift();
        insideBuilder();

    }else{
        score -= 10;
        fragencounter += 1;  
        punkte.innerText = score;
        fragencount.innerText = fragencounter;
        alert("falsche Aussage!");  
        questions.shift();
        insideBuilder();  
    }
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
    return array[0];
  }

function deleteTransformDiv() {
    var el = document.getElementsByClassName("TransformableDiv")[0];
    if (el.id = "antworten-tf" || "antworten-mc" || "antworten-gq" || "startBox") el.remove();
}

function EnterRun(event){
    if(event.keyCode == 13) {
        checkForPoints();
    }
}

function restartGame() {
    document.getElementById("question-gerne").style["opacity"] = 1;
    score = 0;
    fragencounter += 1;
    punkte.innerText = score;
    fragencount.innerText = fragencounter;
    LoadMyJs('js/datenbank.js'); 
    fragenAnzeige.style["height"] = "10em";
    upperText.style["flex-direction"] = "column";
    upperText.style["margin-top"] = "2em";
    deleteAfterReload = document.querySelectorAll(".deleteAfterReload");
    deleteTextAreas(deleteAfterReload);
    insideBuilder(); 
}

function deleteTextAreas(uniqueDeleteClass) {
    for (let i = 0; i < uniqueDeleteClass.length; i++) {
        uniqueDeleteClass[i].remove();}
    }

function LoadMyJs(scriptName) {
    var header = document.getElementsByTagName("head")[0];
    var refreshedScript = document.createElement("script");
    refreshedScript.type = "text/javascript";
    refreshedScript.src = scriptName;
    header.appendChild(refreshedScript);
    }

    
function gameStartTextBuilder() {
    var h2 = document.createElement("h2");
    h2.setAttribute("id" , "gameStartHeader")
    h2.setAttribute("class" , "deleteAfterPress")
    h2.style["margin-top"] = "3em";
    h2.innerText = "Are You ready to enter the Guessing Game"
    return h2;
}

function gameOverTextBuilder() {
    var h2 = document.createElement("h2");
    h2.setAttribute("class" , "deleteAfterReload")
    h2.innerText = "Game Over"
    return h2;
}

function gameOverScoreTextBuilder() {
    var h4 = document.createElement("h4");
    h4.setAttribute("class" , "center  deleteAfterReload")
    h4.innerText = score;
    return h4;
}

function questionBuilder() {
    questionGerne.innerText = questions[0].questionType;
    question.innerText = questions[0].question;
    questionGerne.setAttribute("class", questions[0].questionType)
    questionGerne.innerText = questions[0].questionType
}

function buttonBuilder1() {
    let button = document.createElement("button");
    button.setAttribute("class","answer button-style-1");   
    return button;
}

function buttonBuilder2() {
    let button = document.createElement("button");
    button.setAttribute("class","answer button-style-2");   
    button.innerText ="Submit"; 
    button.addEventListener("keypress",EnterRun);
    return button;
}
function SonderStateButtonBuilder() {
    let button = document.createElement("button");
    button.setAttribute("class","center button-style-3");
    button.setAttribute("id","refreshable");
    button.innerText ="restart Guessing Game";
    button.setAttribute("onclick","restartGame()");
    return button;
}
function startGameButtonBuilder() {
    let button = document.createElement("button");
    button.setAttribute("class","button-style-3");
    button.setAttribute("onclick","gameStart()");
    button.innerText ="Start The Guessing Game";
    return button;
}

function inputBuilder() {
    let input = document.createElement("input");
    input.setAttribute("type","text");   
    input.setAttribute("id","inputOfGq");   
    input.setAttribute("placeholder","input here!");   
    input.setAttribute("required","required");   
    return input;
}

function gameStart() {
    deleteAfterPress = document.querySelectorAll(".deleteAfterPress");
    deleteTextAreas(deleteAfterPress); 
    upperText.style["flex-direction"] =: "column";
    upperText.style["margin-top"] =: 0;
    insideBuilder();
}

function gameStartBuilder() {
    if (!container.hasChildNodes()) container.appendChild(section);
    if (section.hasChildNodes()) deleteTransformDiv();

    upperText.appendChild(gameStartTextBuilder());    
    
    document.getElementById("question-gerne").style["opacity"] = 0;
    punkte.innerText = score;
    fragencount.innerText = fragencounter;
    var div = document.createElement("div");
    Object.entries( { id : 'startBox' , class : 'flex TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
    section.appendChild(div);    
    div.appendChild( startGameButtonBuilder() );
    
}

function insideBuilder() {
    if (section.hasChildNodes()) deleteTransformDiv();
    if (questions.length === 0 || fragencounter === 10) { 
        fragencounter = 0;

        
        
        document.getElementById("question-gerne").style["opacity"] = 0;
        questionGerne.innerText = "";
        question.innerText = "";
        
        var div = document.createElement("div");
        Object.entries( { id : 'gameOverScreen' , class : 'TransformableDiv gameover' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
        section.appendChild(div);
        div.appendChild( SonderStateButtonBuilder() );
        upperText.appendChild(gameOverTextBuilder());
        upperText.appendChild(gameOverScoreTextBuilder());
        upperText.style["flex-direction"] =: "column";
        upperText.style["margin-top"] =: "2em";
        fragenAnzeige.style["height"] = "20em";
        return;
        
    }
    document.getElementById("question-gerne").style["opacity"] = 1;
    shuffle(questions);

    switch(questions[0].type){
        case "mc":
            
            if (section.hasChildNodes()) deleteTransformDiv();

            
            questionBuilder();

            var div = document.createElement("div");
            Object.entries( { id : 'antworten-mc' , class : 'flex TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
            section.appendChild(div);
            div.appendChild( buttonBuilder1() );
            div.appendChild( buttonBuilder1() );
            div.appendChild( buttonBuilder1() );
            div.appendChild( buttonBuilder1() );

            button1 = document.getElementsByTagName("button")[0];   
            button2 = document.getElementsByTagName("button")[1];   
            button3 = document.getElementsByTagName("button")[2];   
            button4 = document.getElementsByTagName("button")[3];  

            shuffle(questions[0].choices);

            button1.innerHTML = questions[0].choices[0]; 
            button2.innerHTML = questions[0].choices[1];
            button3.innerHTML = questions[0].choices[2];
            button4.innerHTML = questions[0].choices[3];

            allButtons = document.querySelectorAll("button");

            for (let i = 0; i < allButtons.length; i++) {
                allButtons[i].addEventListener("click", checkForPoints);
            }

            

            break;

        case "tf":

            if (section.hasChildNodes()) deleteTransformDiv();

            questionBuilder();

            var div = document.createElement("div");
            Object.entries( { id : 'antworten-tf' , class : 'flex TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
            section.appendChild(div);

            div.appendChild( buttonBuilder1() );
            div.appendChild( buttonBuilder1() );

            button1 = document.getElementsByTagName("button")[0];   
            button2 = document.getElementsByTagName("button")[1];   

            shuffle(questions[0].choices);
            
            button1.innerHTML = questions[0].choices[0]; 
            button2.innerHTML = questions[0].choices[1];
            


            allButtons = document.querySelectorAll("button");

            for (let i = 0; i < allButtons.length; i++) {
                allButtons[i].addEventListener("click", checkForPoints);
            }

            break;
        
        case "gq":

            if (section.hasChildNodes()) deleteTransformDiv();

            questionBuilder();

            var div = document.createElement("div");
            Object.entries( { id : 'antworten-gq' , class : 'flex TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
            section.appendChild(div);
            div.appendChild( inputBuilder() ); 
            div.appendChild( buttonBuilder2() );


            allButtons = document.querySelectorAll("button");

            for (let i = 0; i < allButtons.length; i++) {
                
                allButtons[i].addEventListener("click", checkForPoints);
            }

            

            break;
    }
    
}

window.addEventListener("load", gameStartBuilder);




