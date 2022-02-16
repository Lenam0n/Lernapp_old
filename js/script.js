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
    
    var dif = "leicht";
    
    var sortedByDif;

    var prüfung;
    
    
    
    function checkForPoints(event) {
    
    targetVal = event.target.innerText || event.target.value;
    
    
    if (targetVal === "Submit")
    
    {targetVal = document.getElementById("inputOfGq").value;}
    
    
    if (targetVal == sortedByDif[0].correct){
    
    if (dif == 'leicht') {
    
    score += 10;
    
    }
    
    if (dif == 'medium') {
    
    score += 15;
    
    }
    
    if (dif == 'hard') {
    
    score += 20;
    
    }
    
    fragencounter += 1;
    
    punkte.innerText = score;
    
    fragencount.innerText = fragencounter;
    
    sortedByDif.shift();
    
    insideBuilder();
    
    
    }else{
    
    if (dif == 'leicht') {
    
    score -= 20;
    
    }
    
    if (dif == 'medium') {
    
    score -= 15;
    
    }
    
    if (dif == 'hard') {
    
    score -= 5;
    
    }
    
    fragencounter += 1; 
    
    punkte.innerText = score;
    
    fragencount.innerText = fragencounter;
    
    alert('falsche Aussage!'); 
    
    sortedByDif.shift();
    
    insideBuilder(); 
    
    }
    
    }
    
    
    function EnterRun(event){
    
    if(event.keyCode == 13) {
    
    checkForPoints( event );
    
    }
    
    }
    
    
    function restartGame() {
    
    document.getElementById("question-gerne").style["opacity"] = 1;
    
    score = 0;
    
    fragencounter = 0;
    
    punkte.innerText = score;
    
    fragencount.innerText = fragencounter;
    
    LoadMyJs('js/datenbank.js'); 
    
    fragenAnzeige.style["height"] = "10em";
    
    upperText.style["flex-direction"] = "row";
    
    upperText.style["margin-top"] = "0";
    
    deleteAfterReload = document.querySelectorAll(".deleteAfterReload");
    
    deleteTextAreas(deleteAfterReload);
    
    shuffle( sortForDifficulty(questions,dif) );
    
    insideBuilder(); 
    
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
    
    h2.innerText = "Are You Ready To Enter The Guessing Game"
    
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
    
    h4.setAttribute("class" , "center deleteAfterReload")
    
    h4.innerText = score;
    
    return h4;
    
    }
    
    
    function questionBuilder() {
    
    questionGerne.innerText = sortedByDif[0].questionType;
    
    question.innerText = sortedByDif[0].question;
    
    questionGerne.setAttribute("class", sortedByDif[0].questionType)
    
    questionGerne.innerText = sortedByDif[0].questionType
    
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
    
    button.innerText ="Restart";
    
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
    
    
    function AdvancedButtonBuilder(difficultyState,valueOf ) {
    
    let button = document.createElement("button");
    
    Object.entries( { id : difficultyState , class : 'difButton button-style-extend' } ).forEach( ( [ key , value ] ) => button.setAttribute( key , value ) );
    
    button.innerText = difficultyState;
    
    button.addEventListener("click" , () => {
    
    valueOf = button.innerText;});
    
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
    
    
    function gameStart() {
    
    deleteAfterPress = document.querySelectorAll(".deleteAfterPress");
    
    deleteTextAreas(deleteAfterPress); 
    
    upperText.style["flex-direction"] = "row";
    
    upperText.style["margin-top"] = 0;
    
    fragencounter = 0;
    
    shuffle( sortForDifficulty(questions,dif) );
    
    insideBuilder();
    
    }
    
    
    function difficultyBoxBuilder() {
    
    let div = document.createElement("div");
    
    Object.entries( { id : 'difficultyBox' , class : 'flex center TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
    
    section.appendChild(div); 
    
    div.appendChild( AdvancedButtonBuilder("leicht",dif) );
    
    div.appendChild( AdvancedButtonBuilder("medium",dif) );
    
    div.appendChild( AdvancedButtonBuilder("hard",dif) );
    
    }
    
    function PrüfungsBoxBuilder() {

        let div = document.createElement("div");
        
        Object.entries( { id : 'prüfungsBox' , class : 'flex center TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
        
        section.appendChild(div); 
        
        div.appendChild( AdvancedButtonBuilder("normal",prüfung) );
        
        div.appendChild( AdvancedButtonBuilder("Prüfungsrelevant",prüfung) );
        
        }
        
        
    
    function startBoxBuilder() {
    
    let div = document.createElement("div");
    
    Object.entries( { id : 'startBox' , class : 'flex TransformableDiv' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
    
    section.appendChild(div); 
    
    div.appendChild( startGameButtonBuilder() );
    
    }
    
    
    function deleteTextAreas(uniqueDeleteClass) {
    
    for (let i = 0; i < uniqueDeleteClass.length; i++) {
    
    uniqueDeleteClass[i].remove();}
    
    }
    
    
    function deleteTransformDiv() {
    
    var el = document.getElementsByClassName("TransformableDiv")[0];
    
    if (el.id = "antworten-tf" || "antworten-mc" || "antworten-gq" || "startBox" || 'prüfungsBox' || 'difficultyBox') el.remove();
    
    }
    
    
    function deleteTransformDiv() {

        var el = document.querySelectorAll("TransformableDiv");
        el.forEach(
            
        ).remove();
        if (el.id = "antworten-tf" || "antworten-mc" || "antworten-gq" || "startBox" || 'prüfungsBox' || 'difficultyBox') el.remove();
        
        }
        
        /* k */
    
    
    
    function gameStartBuilder() {
    
    if (!container.hasChildNodes()) container.appendChild(section);
    
    if (section.hasChildNodes()) deleteTransformDiv();
    
    upperText.appendChild(gameStartTextBuilder()); 
    
    document.getElementById("question-gerne").style["opacity"] = 0;
    
    punkte.innerText = score;
    
    fragencount.innerText = fragencounter;
    
    startBoxBuilder();
    
    difficultyBoxBuilder();

    PrüfungsBoxBuilder();


    
    }
    
    
    function sortForDifficulty(a,b) {
    
    sortedByDif = a.filter(a => a.difficulty == b);
    
    return sortedByDif;
    
    }
    
    
    function shuffle(array) {
    
    let currentIndex = array.length, randomIndex;
    
    
    while (currentIndex != 0) {
    
    randomIndex = Math.floor(Math.random() * currentIndex);
    
    currentIndex--;
    
    
    [array[currentIndex], array[randomIndex]] = [
    
    array[randomIndex], array[currentIndex]];
    
    }
    
    return array[0];
    
    }
    
    
    function insideBuilder() {
    
    if (section.hasChildNodes()) deleteTransformDiv();
    
    if (questions.length === 0 || fragencounter === 10) { 
    
    document.getElementById("question-gerne").style["opacity"] = 0;
    
    questionGerne.innerText = "";
    
    question.innerText = "";
    
    var div = document.createElement("div");
    
    Object.entries( { id : 'gameOverScreen' , class : 'TransformableDiv gameover center' } ).forEach( ( [ key , value ] ) => div.setAttribute( key , value ) );
    
    section.appendChild(div);
    
    div.appendChild( SonderStateButtonBuilder() );
    
    upperText.appendChild(gameOverTextBuilder());
    
    upperText.appendChild(gameOverScoreTextBuilder());
    
    upperText.style["flex-direction"] = "column";
    
    upperText.style["margin-top"] = "2em";
    
    fragenAnzeige.style["height"] = "20em";
    
    fragencounter = 0;
    
    return;
    
    }
    
    document.getElementById("question-gerne").style["opacity"] = 1;
    
    shuffle( sortForDifficulty(sortedByDif,dif) );
    
    
    upperText.style["flex-direction"] = "row";
    
    
    switch(sortedByDif[0].type){
    
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
    
    
    shuffle(sortedByDif[0].choices);
    
    
    button1.innerHTML = sortedByDif[0].choices[0]; 
    
    button2.innerHTML = sortedByDif[0].choices[1];
    
    button3.innerHTML = sortedByDif[0].choices[2];
    
    button4.innerHTML = sortedByDif[0].choices[3];
    
    
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
    
    
    shuffle(sortedByDif[0].choices);
    
    button1.innerHTML = sortedByDif[0].choices[0]; 
    
    button2.innerHTML = sortedByDif[0].choices[1];
    
    
    
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
    
    
    
    
    