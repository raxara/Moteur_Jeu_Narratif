class DialogNode {

    constructor(startAnswer, dialogText, answers, id) {
        if (startAnswer === undefined) {
            this.Type = DialogType.Empty;
        } else if (Array.isArray(answers)) {
            this.Type = DialogType.Middle;
        } else if (Array.isArray(dialogText)) {
            this.Type = DialogType.Beginning;
            id = answers;
            answers = dialogText;
            dialogText = startAnswer;
            startAnswer = undefined;
        } else {
            this.Type = DialogType.Ending;
            id = answers;
        }
        if (id != undefined) {
            this.id = id;
        } else {
            this.id = GenerateId(DataType.Dialog, this.Type);
        }
        this.startAnswer = startAnswer;
        this.dialogText = dialogText;
        this.answers = answers;
    }

    //------------------------------------------------getters---------------------------------------------------------//
    getBeginning() {
        return this.Type == DialogType.Beginning;
    }

    getEnding() {
        return this.Type == DialogType.Ending;
    }

    getMiddle() {
        return this.Type == DialogType.Middle;
    }

    getEmpty() {
        return this.Type == DialogType.Empty;
    }

    setChild(child) {
        this.answers.push(child.id);
    }

    ShowStartAnswer(parent) {
        let p = document.createElement('p');
        p.textContent = this.StartAnswer;
        parent.appendChild(p);
    }

    ShowDialog(parent, inEditor) {
        if (this.Type == DialogType.Empty) {
            let p = document.createElement("p");
            p.textContent = "ce dialogue est vide";
            parent.appendChild(p);
            return;
        }
        if (inEditor != undefined && inEditor) {
            let p1 = document.createElement("p");
            p1.textContent = (this.startAnswer == undefined) ? "X" : this.startAnswer; 
            parent.appendChild(p1);
        }
        let p2 = document.createElement('p');
        p2.textContent = (this.dialogText == undefined) ? "X" : this.dialogText;
        parent.appendChild(p2);
        let answersDiv = document.createElement('div');
        answersDiv.className = "answers";
        if (this.Type == DialogType.Beginning || this.Type == DialogType.Middle) {
            let answer;
            for (let i = 0; i < this.answers.length; i++) {
                answer = createNodeByID(this.answers[i]);
                let newElem;
                if (inEditor != undefined && inEditor) {
                    newElem = document.createElement('p');
                } else {
                    newElem = document.createElement('button');
                    newElem.addEventListener("click", function () {
                        answer.ShowDialog(parent);
                    });
                }
                newElem.textContent = "id : " + answer.id + "\n" + answer.startAnswer;
                parent.appendChild(newElem);
            }
            parent.appendChild(answersDiv);
        } else {
            let p = document.createElement("p");
            p.textContent = "pas de reponses définies";
            answersDiv.appendChild(p);
        }
    }

    /*
    ShowDialogInEditor(parent) {
        let p = document.createElement('p');
        p.textContent = this.dialogText;
        parent.appendChild(p);
        let answersDiv = document.createElement('div');
        answersDiv.className = "answers";
        if (this.Type == DialogType.Beginning || this.Type == DialogType.Middle) {
            let answer;
            for (let i = 0; i < this.answers.length; i++) {
                answer = createNodeByID(this.answers[i]);
                let p = document.createElement('p');
                p.textContent = answer.startAnswer;
                parent.appendChild(p);
            }
            parent.appendChild(answersDiv);
        }
    }
*/
    StoreData(dataDic) {
        let newDico;
        switch(this.Type.type) {
            case 'Beginning' :
                newDico = {
                    dialogText : this.dialogText,
                    answers : this.answers
                };
                break;
            case 'Middle' :
                newDico = {
                    startAnswer : this.startAnswer,
                    dialogText : this.dialogText,
                    answers : this.answers
                };
                break;
            case 'Ending' :
                newDico = {
                    startAnswer : this.startAnswer,
                    dialogText : this.dialogText,
                };
                break;
            case 'Empty' :
                newDico = {};
                break;
            }
        dataDic["Dialogs"][this.id] = newDico;
    }
}