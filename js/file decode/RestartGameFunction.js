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
    button.setAttribute("onclick","restartGame()");
    return button;
}


