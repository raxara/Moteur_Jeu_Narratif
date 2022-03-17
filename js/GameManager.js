//------------------------------------------------variables globales---------------------------------------------------------//

let playButton = document.querySelector(".playButton");
let playField = document.querySelector(".playField");

let curDialogNode;

//--------------------------------------------------event listeners----------------------------------------------------------//

playButton.addEventListener("click", LaunchGame);

//-----------------------------------------------------fonctions-------------------------------------------------------------//

function LaunchGame() {
    let dialogNode = createNodeByID("D<3");
    dialogNode.ShowDialog(playField);
    curDialogNode = dialogNode;
}

//-------------------------------------------------------main----------------------------------------------------------------//