const container = document.getElementById("inside-changer");
const chooseType = document.getElementById("chooseType");
const submitButton = document.getElementsByTagName("input")[1];
const section = document.createElement("Section");
const question = document.getElementsByClassName("question")[0];
const questionGerne = document.getElementById("question-gerne");

var allButtons;
var targetVal;
var button1; 
var button2; 
var button3;  
var button4;   

var punkte = document.getElementById("punkte");
var score = 0;


function checkForPoints(event) {
        targetVal = event.target.innerText;
        
        if (targetVal === "Submit")
        {targetVal = document.getElementById("inputOfGq").value;}
        
        console.log(targetVal);
        console.log(questions[0].correct);

    if (targetVal === questions[0].correct){
        score += 10;
        punkte.innerText = score;
        questions.shift();
        insideBuilder();

    }else{
        score -= 10;
        punkte.innerText = score;
        alert("falsche Aussage!");  
        questions.shift();  
        insideBuilder();  
    }
}


function shuffle() {
    let currentIndex = questions.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [questions[currentIndex], questions[randomIndex]] = [
        questions[randomIndex], questions[currentIndex]];
    }
    
    return questions[0];
  }


function gameOverTextBuilder() {
    let upperText = document.getElementById("upper-Text");
    var h2 = document.createElement("h2");
    h2.setAttribute("id" , "gameOverHeader")
    h2.innerText = "Game Over"
    return h2;
}

function questionBuilder() {
    questionGerne.innerText = questions[0].questionType;
    question.innerText = questions[0].question;
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
    button.setAttribute("onclick","checkForPoints()");  
    return button;
}
function SonderStateButtonBuilder() {
    let button = document.createElement("button");
    button.setAttribute("class","button-style-3");
    button.setAttribute("onclick","insideBuilder() , score = 0");
    button.innerText ="restart Guessing Game";
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

function insideBuilder() {
    if (!container.hasChildNodes()) container.appendChild(section);

    if (questions.length === 0) { 
        if (section.hasChildNodes()) deleteTransformDiv();

        document.getElementById("question-gerne").style["opacity"] = 0;
        questionGerne.innerText = "";
        question.innerText = "";

        var div = document.createElement("div");
        Object.entries( { id : 'gameOverScreen' , class : 'flex gameover' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
        section.appendChild(div);
        div.appendChild( SonderStateButtonBuilder() );



        
    }

    shuffle();

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

function deleteTransformDiv() {

    var el = document.getElementsByClassName("TransformableDiv")[0];
    if (el.id = "antworten-tf" || "antworten-mc" || "antworten-gq") el.remove();
}

function EnterRun(event){
    if(event.keyCode == 13) {
        insideBuilder();
    }
}

submitButton.addEventListener("click" ,insideBuilder);
chooseType.addEventListener("keypress",EnterRun);
window.addEventListener("load", insideBuilder);


    function test(p) {
        console.log(p || "test");
    }

