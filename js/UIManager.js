//------------------------------------------------variables globales---------------------------------------------------------//

let firstInput = document.querySelector("#answer1");
let dialogButton = document.querySelector('.dialogButton');

//--------------------------------------------------event listeners----------------------------------------------------------//

firstInput.addEventListener("focusin", addInput);
firstInput.addEventListener("focusout", removeInput);

dialogButton.addEventListener("click", createDialog);

//-----------------------------------------------------fonctions-------------------------------------------------------------//

function addInput() {
    newInput = document.createElement("input");
    newInput.id = this.id.slice(0, -1) + (parseInt(this.id.slice(-1)) + 1);
    newInput.placeholder = newInput.id;
    newInput.className = "dialogValues";
    newInput.addEventListener("focusin", addInput);
    newInput.addEventListener("focusout", removeInput);
    this.parentNode.appendChild(newInput);
    this.removeEventListener("focusin", addInput);
}

function removeInput() {
    if (this.value == "") {
        let parent = this.parentNode;
        let nextInput = parent.querySelector("#" + this.id.slice(0, -1) + (parseInt(this.id.slice(-1)) + 1));
        if (nextInput != null && nextInput.value == "") {
            parent.querySelector("#" + this.id.slice(0, -1) + (parseInt(this.id.slice(-1)) + 1)).remove();
            this.addEventListener("focusin", addInput);
        }
        else if (nextInput.value != "") {
            this.remove();
            sortIDs(parent);
        }
    }
}

function clearInputs() {
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        if (i > 2) {
            inputs[i].remove();
        } else {
            inputs[i].value = "";
        }
    }
    firstInput.addEventListener("focusin", addInput);
    firstInput.addEventListener("focusout", removeInput);
}

function sortIDs(parent) {
    let children = parent.querySelectorAll("input");
    let index = 1;
    let id = children[0].id.slice(0, -1);
    for (input of children) {
        input.id = id + index;
        input.placeholder = id + index;
        index++;
    }
}

function createDialog() {
    resetID();
    let parent = this.parentNode;
    let nodes = parent.querySelectorAll(".dialogValues");
    let values = new Array();
    let dialog;
    for (let i = 0; i < nodes.length - 1; i++) {
        if (i < 2) {
            values.push(nodes[i].value);
        } else {
            dialog = new DialogNode(nodes[i].value, "");
            dialog.StoreData(GameData);
            values.push(dialog.id);
        }
    }
    dialog = new DialogNode(values[0], values[1], values.slice(2, values.length));
    dialog.StoreData(GameData);
    dialog.ShowDialog(parent.parentNode, true);
    console.log(GameData);
    clearInputs();
}

function showDialogs() {
    let editorDiv = document.querySelector(".editor");
    for (let dialog of Object.entries(GameData["Dialogs"])) {
        console.log(dialog[1].startAnswer);
        let cardDiv = document.createElement("div");
        let pStartAnswer = document.createElement("p");
        pStartAnswer.textContent = dialog[1].startAnswer;
        let pDialogText = document.createElement("p");
        pDialogText.textContent = dialog[1].dialogText;
        let answersDiv = document.createElement("div");
        for (answer of dialog[1].answers) {
            let answerP = document.createElement("p");
            answerP.textContent = answer;
            answersDiv.appendChild(answerP);
        }
        
    }
}


