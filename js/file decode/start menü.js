window.addEventListener("load", gameStartBuilder);

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

    if (typeof fach !== 'undefined' && prüfungsrelevant === false) {
        shuffle( sortQuestions(questions,fach,'questionType') );
    }

    if(prüfungsrelevant === true){
        shuffle( sortQuestions(questions,true,'prüfungsrelevant') );
        
    }
    if (prüfungsrelevant === false) {
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

