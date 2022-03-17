function test(param) {
    console.log(param || "test");
}

function deleteTextAreas(uniqueDeleteClass) {
    for (let i = 0; i < uniqueDeleteClass.length; i++) {
        uniqueDeleteClass[i].remove();}
    }

function deleteTransformDiv() {
    var el = document.getElementsByClassName("TransformableDiv")[0];
    if (el.id = "antworten-tf" || "antworten-mc" || "antworten-gq" || "startBox") el.remove();
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
