function checkForPoints(event) {
    targetVal = event.target.innerText || event.target.value;

    if (targetVal === "Submit")
        {targetVal = document.getElementById("inputOfGq").value;}

    if (targetVal == sortedArray[0].correct){
        if (prüfungsrelevant === false) {
            if (dif == 'leicht') {
                score += 5;
            }
            if (dif == 'medium') {
                score += 10;
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
        alert('falsche Aussage!');  

        wrongAnswer = sortedArray.shift();
        console.log(wrongAnswer.question);

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
    if (questions.length === 0 && prüfungsrelevant === false || fragencounter === 10 && prüfungsrelevant === false) { 
                
        document.getElementById("question-gerne").style["opacity"] = 0;
        questionGerne.innerText = "";
        question.innerText = "";
        
        var div = document.createElement("div");
        Object.entries( { id : 'gameOverScreen' , class : 'TransformableDiv gameover center' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
        section.appendChild(div);
        div.appendChild( RestartGameButtonBuilder() );
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

    if (typeof fach !== 'undefined' && prüfungsrelevant === false) {
        shuffle( sortQuestions(sortedArray,fach,'questionType') );}
    if (prüfungsrelevant === false) {
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

            questionBuilder();

            fragenAnzeige.appendChild(sortedArray[0].image);

            var div = document.createElement("div");
            Object.entries( { id : 'antworten-gq' , class : 'flex TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
            section.appendChild(div);
            div.appendChild( /*  */ ); 
            div.appendChild( /*  */ );


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