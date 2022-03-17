//------------------------------------------------variables globales---------------------------------------------------------//

let IDIndex = 0;
let GameData = {Dialogs : {},
                Characters : {},
                Places : {}
                };

//--------------------------------------------------event listeners----------------------------------------------------------//

window.addEventListener("unload", function() {
    window.localStorage.setItem("index", IDIndex);
});

window.addEventListener("load", function() {
    if (window.localStorage.getItem("index") != null) {
        IDIndex = parseInt(window.localStorage.getItem("index"));
    }
});

//-----------------------------------------------------fonctions-------------------------------------------------------------//

function GenerateId(dataType, objectType) {
    IDIndex++;
    switch (dataType.type) {
        case 'Character' : return 'C' + IDIndex;
        case 'Place' : return 'P' + IDIndex;
        case 'Dialog' :
            switch(objectType.type) {
                case 'Beginning' : return 'D<' + IDIndex;
                case 'Middle' : return 'D-' + IDIndex;
                case 'Ending' : return 'D>' + IDIndex;
                case 'Empty' : return 'Dx' + IDIndex;
            }
    }
}

function getArrayFromGameData(dataType) {
    switch (dataType.type) {
        case 'Character' : return "";
        case 'Place' : return "";
        case 'Dialog' :
            let array = new Array();
    }
}

function resetID() {
    IDIndex = 0;
}

function createNodeByID(id) {
    switch (id.slice(0, 1)) {
        case "D" :
            if (id in GameData["Dialogs"]) {
                let dialog = GameData["Dialogs"][id];
                return new DialogNode(dialog.startAnswer, dialog.dialogText, dialog.answers);
            }
            else {
                return new DialogNode("reponse vide", "ce texte est vide");
            }
    }
}

function getStartAnswerByID(id) {
    if (id.slice(0, 1) == "D") {
        if (id in GameData["Dialogs"]) {
            return GameData["Dialogs"][id].startAnswer;
        }
    }
}

function createFirstDialogNode() {
    let dialogs = GameData["Dialogs"];
}

function setJSON(Dialogs, dataType) {
    let value = JSON.stringify(Dialogs);
    window.localStorage.setItem("myJSON", value);
}

function getJSON() {
    return JSON.parse(window.localStorage.getItem("myJSON"));
}

//-------------------------------------------------------enums---------------------------------------------------------------//

class DataType {
    static Dialog = new DataType('Dialog');
    static Character = new DataType('Character');
    static Place = new DataType('Place');

    constructor(type) {
        this.type = type;
    }

    toString() {
        return 'Color.${this.type}';
    }
}

class DialogType {
    static Beginning = new DialogType('Beginning');
    static Ending = new DialogType('Ending');
    static Empty = new DialogType('Empty');
    static Middle = new DialogType('Middle');
    constructor(type) {
        this.type = type;
    }

    toString() {
        return 'Color.${this.type}';
    }
}

