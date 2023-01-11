window.addEventListener("load", gameStartBuilder);

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
var dif;
var sortedArray;
var uniqeFachArray;
var fach;
var fächerAbfrage = false;
var prüfungsrelevant = false;
var wrongAnswer;
var wrongAnswerArray = {};

/*
*
*
*
*
*
*
****************************************************************************
*
*                       Utility Funktionen
*
****************************************************************************
*
*
*
*
* 
*/

function test(param) {
    console.log(param || "test");
}

function deleteTextAreas(uniqueDeleteClass) {
    for (let i = 0; i < uniqueDeleteClass.length; i++) {
        uniqueDeleteClass[i].remove();}
    }

function deleteTransformDiv(a) {
    var el = document.getElementsByClassName("TransformableDiv")[0];
    if (el.id = a ||"antworten-tf" || "antworten-mc" || "antworten-gq" || "antworten-pq" || "startBox"|| "reStartBox") el.remove();
}

function LoadMyJs(scriptName) {
    var header = document.getElementsByTagName("head")[0];
    var refreshedScript = document.createElement("script");
    refreshedScript.type = "text/javascript";
    refreshedScript.src = scriptName;
    header.appendChild(refreshedScript);
    }

function EnterRun(event){
    if(event.keyCode == 13) {
        checkForPoints( event );
    }
}
function sortQuestions(a,b,c) {
    sortedArray = a.filter(a => a[c] == b);
    return sortedArray;
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

function uniqeFächer() {
    uniqeFachArray =  questions.map(item => item.questionType)
    .filter((value, index, self) => self.indexOf(value) === index)
    return uniqeFachArray;
    
}
/*
*
*
*
*
*
*
****************************************************************************
*
*                       Start Menü
*
****************************************************************************
*
*
*
*
* 
*/

function gameStartBuilder() {
    if (!container.hasChildNodes()) container.appendChild(section);
    if (section.hasChildNodes()) deleteTransformDiv();
    
    if (!upperText.hasChildNodes('h2')) {
    }
    upperText.appendChild(gameStartTextBuilder());    
    
    document.getElementById("question-gerne").style["opacity"] = 0;
    punkte.innerText = score;
    fragencount.innerText = fragencounter;
    
    lessonBoxBuilder();
    difficultyBoxBuilder();

}

function gameStart() {
    deleteAfterPress = document.querySelectorAll(".deleteAfterPress");
    deleteTextAreas(deleteAfterPress); 
    upperText.style["flex-direction"] = "row";
    upperText.style["margin-top"] = 0;
    fragencounter = 0;

    if (fächerAbfrage === true && prüfungsrelevant === false) {
        shuffle( sortQuestions(questions,fach,'questionType') );
    }

    if(prüfungsrelevant === true){
        shuffle( sortQuestions(questions,true,'prüfungsrelevant') );
        
        
    }
    if (fächerAbfrage === false && prüfungsrelevant === false) {
        shuffle( sortQuestions(questions,dif,'difficulty') );
        
    }
    
    
    insideBuilder();
    
}

function lessonBoxBuilder() {
    let div = document.createElement("div");
    Object.entries( { id : 'lessonBox' , class : 'flex center TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
    section.appendChild(div);    
    div.appendChild( lessonBoxButtonBuilder('Fächer') );
    div.appendChild( prüfungsButtonBuilder('prüfungsrelevant') );
}

function lessonBoxButtonBuilder(lesson) {
    let button = document.createElement("button");
    Object.entries( { id : lesson , class : 'MenüButton button-style-extend' } ).forEach( ( [ key , value ] ) => button.setAttribute( key , value ) );
    button.innerText = lesson;
    button.addEventListener("click" , () => {
        while (section.hasChildNodes()) deleteTransformDiv();
        let div = document.createElement( 'div' );
        Object.entries( { id : 'lessonBox' , class : 'flex center TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
        section.append( div );
        uniqeFächer();
        for (let i = 0; i< uniqeFachArray.length ; i++) {
            div.appendChild( lessonButtonBuilder(uniqeFachArray[i]) );
            
        }
    });
    return button;
}

function lessonButtonBuilder(lesson) {
    fächerAbfrage = true;
    prüfungsrelevant = false;
    let button = document.createElement("button");
    Object.entries( { id : lesson , class : 'MenüButton button-style-extend ' + lesson } ).forEach( ( [ key , value ] ) => button.setAttribute( key , value ) );
    button.innerText = lesson;
    button.addEventListener("click" , () => {
        fach = button.innerText;
    
        startBoxBuilder();
        

    });
    return button;
}

function prüfungsButtonBuilder(p) {
    fächerAbfrage = false;
    let button = document.createElement("button");
    Object.entries( { id : 'prüfungsButton' , class : 'MenüButton button-style-extend' } ).forEach( ( [ key , value ] ) => button.setAttribute( key , value ) );
    button.innerText = p;
    button.addEventListener("click" , () => {
        prüfungsrelevant = true;
        startBoxBuilder();});
    return button;
}

function difficultyBoxBuilder() {
    let div = document.createElement("div");
    Object.entries( { id : 'difficultyBox' , class : 'flex center TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
    section.appendChild(div);    
    div.appendChild( difficultyButtonBuilder("leicht") );
    div.appendChild( difficultyButtonBuilder("medium") );
    div.appendChild( difficultyButtonBuilder("hard") );
}

function difficultyButtonBuilder(difficultyState) {
    fächerAbfrage = false;
    prüfungsrelevant = false;
    let button = document.createElement("button");
    Object.entries( { id : difficultyState , class : 'MenüButton button-style-extend' } ).forEach( ( [ key , value ] ) => button.setAttribute( key , value ) );
    button.innerText = difficultyState;
    button.addEventListener("click" , () => {
        dif = button.innerText;
        startBoxBuilder();});
    return button;
}

function startBoxBuilder() {
    while (section.hasChildNodes()) deleteTransformDiv();
    let div = document.createElement("div");
    Object.entries( { id : 'startBox' , class : 'flex TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
    section.appendChild(div);    
    div.appendChild( backToMainButtonBuilder() );
    div.appendChild( startGameButtonBuilder() );
}

function startGameButtonBuilder(params) {
    let button = document.createElement("button");
    button.setAttribute("class","button-style-3");
    button.setAttribute("onclick","gameStart()");
    button.innerText ="Start The Guessing Game";
    return button;
}

function backToMainButtonBuilder() {
    let button = document.createElement("button");
    button.setAttribute("class","button-style-4");
    button.setAttribute("id","backToMainButton")
    button.addEventListener('click', ()=> {
        deleteAfterReload = document.querySelectorAll(".deleteAfterPress");
        deleteTextAreas(deleteAfterReload);
        gameStartBuilder();
    });
    button.innerText ="Back to the Main Menü";
    return button;
}

function gameStartTextBuilder() {
    var h2 = document.createElement("h2");
    h2.setAttribute("id" , "gameStartHeader")
    h2.setAttribute("class" , "deleteAfterPress")
    h2.style["margin-top"] = "3em";
    h2.innerText = "Are You Ready To Enter The Guessing Game"
    return h2;
}

/*
*
*
*
*
*
*
****************************************************************************
*
*                       Game Funktionen
*
****************************************************************************
*
*
*
*
* 
*/

function checkForPoints(event) {
    targetVal = event.target.innerText || event.target.value;

    if (targetVal === "Submit")
        {targetVal = document.getElementById("inputOfGq").value;}

    if (targetVal == sortedArray[0].correct){
        if (prüfungsrelevant === false) {
            if (dif == 'leicht') {
                score += 10;
            }
            if (dif == 'medium') {
                score += 15;
            }
            if (dif == 'hard') {
                score += 20;
            }
        }else{
            score += 1;
        }
        fragencounter += 1;
        punkte.innerText = score;
        fragencount.innerText = fragencounter;
        sortedArray.shift();


        insideBuilder();

    }else{
        if (prüfungsrelevant === false) {
            if (dif == 'leicht') {
                score -= 15;
            }
            if (dif == 'medium') {
                score -= 10;
            }
            if (dif == 'hard') {
                score -= 5;
            }
        }else{
            score -= 1;
        }
        fragencounter += 1;  
        punkte.innerText = score;
        fragencount.innerText = fragencounter;
        wrongAnswer = sortedArray.shift();
        wrongAnswerArray[wrongAnswer.question] = wrongAnswer.correct ;
        console.log(wrongAnswerArray);

        if(wrongAnswer.warumRichtig != ''){
            alert('falsche Antwort!' + '\n \nDie richige Antwort wäre:     ' + wrongAnswer.correct + '\n \n' + wrongAnswer.warumRichtig);  
        }else{
           alert('falsche Antwort!' + '\n \nDie richige Antwort wäre:     ' + wrongAnswer.correct);
        }



        insideBuilder();  
    }
}

function questionBuilder() {
    questionGerne.innerText = sortedArray[0].questionType;
    question.innerText = sortedArray[0].question;
    questionGerne.setAttribute("class", sortedArray[0].questionType);
    questionGerne.innerText = sortedArray[0].questionType;
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

function inputBuilder() {
    let input = document.createElement("input");
    input.setAttribute("type","text");   
    input.setAttribute("id","inputOfGq");   
    input.setAttribute("placeholder","input here!");   
    input.setAttribute("required","required");
    input.addEventListener( 'keypress' , EnterRun );
    return input;
}

function insideBuilder() {
    if (section.hasChildNodes()) deleteTransformDiv();
    if (fragencounter === 10 && prüfungsrelevant === false || sortedArray.length === 0) { 
        
        document.getElementById("question-gerne").style["opacity"] = 0;
        questionGerne.innerText = "";
        question.innerText = "";

        if(section.querySelector("#antworten-pq") != null){
            deleteTransformDiv('antworten-pq');
        }


        var div = document.createElement("div");
        Object.entries( { id : 'gameOverScreen' , class : 'TransformableDiv gameover center' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
        section.appendChild(div);
        div.appendChild(RestartGameButtonBuilder());
        upperText.appendChild(gameOverTextBuilder());
        upperText.appendChild(gameOverScoreTextBuilder());
        upperText.style["flex-direction"] = "column";
        upperText.style["margin-top"] = "2em";
        fragenAnzeige.style["height"] = "20em";
        fragencounter = 0;
        return;
        
    }
    
    document.getElementById("question-gerne").style["opacity"] = 1;
    
    /* wenn man eine weiter überprüffunktion einbauen will muss man eins der 
    unteren Kopieren und anschließend den 2. Wert = Vergleichswert 
    und den 3. Wert = von wo aus verglichen werden soll anpassen */


    if (fächerAbfrage === true && prüfungsrelevant === false) {
        shuffle( sortQuestions(sortedArray,fach,'questionType') );}
    if (fächerAbfrage === false && prüfungsrelevant === false) {
        shuffle( sortQuestions(sortedArray,dif,'difficulty') );}
    if (prüfungsrelevant === true) {
        shuffle( sortQuestions(sortedArray,true,'prüfungsrelevant') );}

    upperText.style["flex-direction"] = "row";

    switch(sortedArray[0].type){
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

            shuffle(sortedArray[0].choices);

            button1.innerHTML = sortedArray[0].choices[0]; 
            button2.innerHTML = sortedArray[0].choices[1];
            button3.innerHTML = sortedArray[0].choices[2];
            button4.innerHTML = sortedArray[0].choices[3];

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

            shuffle(sortedArray[0].choices);
            
            button1.innerHTML = sortedArray[0].choices[0]; 
            button2.innerHTML = sortedArray[0].choices[1];
            


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


        case "pq":
            /* picture Question */

            if (section.hasChildNodes()) deleteTransformDiv();

            var div = document.createElement("div");
            var Snddiv = document.createElement("div");

            questionBuilder();

        
            var img = new Image();
            img.src = sortedArray[0].image;
            img.setAttribute('class', 'questionImage')
            section.appendChild(Snddiv);
            Snddiv.setAttribute('class', 'TransformableDiv')
            Snddiv.appendChild(img);

            
                
            Object.entries( { id : 'antworten-pq' , class : 'flex TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
            section.appendChild(div);
            div.appendChild( buttonBuilder2() );
            div.appendChild( buttonBuilder2() );
            div.appendChild( buttonBuilder2() );
            div.appendChild( buttonBuilder2() );

            button1 = document.getElementsByTagName("button")[0];   
            button2 = document.getElementsByTagName("button")[1];   
            button3 = document.getElementsByTagName("button")[2];   
            button4 = document.getElementsByTagName("button")[3];  

            shuffle(sortedArray[0].choices);

            button1.innerHTML = sortedArray[0].choices[0]; 
            button2.innerHTML = sortedArray[0].choices[1];
            button3.innerHTML = sortedArray[0].choices[2];
            button4.innerHTML = sortedArray[0].choices[3];

            allButtons = document.querySelectorAll("button");

            for (let i = 0; i < allButtons.length; i++) {
                allButtons[i].addEventListener("click", checkForPoints);
            }

            break;



        case "pa":
            /* picture answers */

            break;
    }
    
}

/*
*
*
*
*
*
*
****************************************************************************
*
*                       Restart Game Funktionen
*
****************************************************************************
*
*
*
*
* 
*/

function restartGame() {
    document.getElementById("question-gerne").style["opacity"] = 1;
    score = 0;
    fragencounter = 0;
    punkte.innerText = score;
    fragencount.innerText = fragencounter;
/*     LoadMyJs('js/datenbank.js'); */ 
    fragenAnzeige.style["height"] = "10em";
    upperText.style["flex-direction"] = "row";
    upperText.style["margin-top"] = "0";
    deleteAfterReload = document.querySelectorAll(".deleteAfterReload");
    deleteTextAreas(deleteAfterReload);
    gameStartBuilder();
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

function RestartGameButtonBuilder() {
    let button = document.createElement("button");
    button.setAttribute("class","center button-style-3");
    button.setAttribute("id","refreshable");
    button.innerText ="Restart";
    button.addEventListener('click',()=>{
        wrongAnswerArray = {};
        restartGame();
        this.remove;
    })
    return button;
}


// =)
