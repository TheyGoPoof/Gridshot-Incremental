var gameData = {
    clicks: 0,
    stage: 1
}

// saves the game every 5 seconds
var saveGameLoop = window.setInterval(function () {
    localStorage.setItem("gameSave", JSON.stringify(gameData))
}, 5000)

// if there is a game save, it loads it
/*
var gameSave = JSON.parse(localStorage.getItem("gameSave"))
if (gameSave !== null) {
    gameData = gameSave
}
*/

createGrid();

/*
var checkId = "" + Math.floor(Math.random() * width) + "," + Math.floor(Math.random() * height);
randButton = document.getElementById(checkId);
randButton.className = "special";

var checkId = "" + Math.floor(Math.random() * width) + "," + Math.floor(Math.random() * height);
randButton = document.getElementById(checkId);
randButton.className = "special";

var checkId = "" + Math.floor(Math.random() * width) + "," + Math.floor(Math.random() * height);
randButton = document.getElementById(checkId);
randButton.className = "special";
*/

// creates the grid
function createGrid() {
    // Clear the existing grid
    document.getElementById("button-container").innerHTML = "";
    var grid = [];
    var width = gameData.stage;
    var height = gameData.stage;
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var button = document.createElement("button");
            //button.innerHTML = grid.length;
            button.id = "" + i + "," + j;
            button.className = "regular";
            (function (button) {
                // for this fun ones you can use are 'mouseover' and 'mousedown' TODO: Make a mousedown upgrade "faster clicks"
                button.addEventListener('click', function () {
                    if (this.className == "regular") {
                        regularButtonPress(this);
                    }
                    if (this.className == "special") {
                        specialButtonPress(this);
                    }
                    if (gameData.clicks < 100) {
                        gameData.stage = 1;
                    }
                    if (100 <= gameData.clicks && gameData.clicks < 1000) {
                        if (gameData.stage != 2) {
                            gameData.stage = 2;
                            createGrid(grid);
                        }
                    }
                    if (1000 <= gameData.clicks && gameData.clicks < 10000) {
                        if (gameData.stage != 3) {
                            gameData.stage = 3;
                            createGrid(grid);
                        }
                    }
                    formatCounter();
                });
            })(button);
            grid.push(button);
        }
    }
    // creates the wrapper element for the buttons
    createButtonWrapper(grid);
}

function formatCounter() {
    var textElement = document.getElementById("counter");
    var currentOpacity = parseFloat(textElement.style.opacity);
    textElement.style.opacity = Math.min(1, currentOpacity + 0.01);
    document.getElementById("counter").innerHTML = `Stage ${gameData.stage}: ${gameData.clicks} clicks`;
}

function regularButtonPress(regularButton) {
    gameData.clicks++;
    console.log(gameData.stage);
}

function specialButtonPress(specialButton) {
    specialButton.className = "regular";
    var checkId = specialButton.id;
    var timesRan = 0;
    while (checkId == specialButton.id) {
        timesRan++;
        checkId = "" + Math.floor(Math.random() * width) + "," + Math.floor(Math.random() * height);
        randButton = document.getElementById(checkId);
        if (timesRan < 1000) {
            if (randButton.className == "special") {
                checkId = specialButton.id;
                continue;
            }
            if (checkId == specialButton.id) {
                continue;
            }
            if (randButton.style.visibility == "hidden") {
                checkId = specialButton.id;
                continue;
            }
        } else {
            if (randButton.className == "special") {
                checkId = specialButton.id;
                continue;
            }
            if (checkId == specialButton.id) {
                continue;
            }
        }

        randButton.className = "special";
    }
}

function createButtonWrapper(grid) {
    var width = gameData.stage;
    var height = gameData.stage;
    var buttonGrid = document.createElement("div");
    buttonGrid.className = "button-grid";
    if (width > 5) {
        buttonGrid.style.setProperty("grid-template-columns", "repeat(" + width + ", " + 500 / width + "px)");
    } else {
        buttonGrid.style.setProperty("grid-template-columns", "repeat(" + width + ", 100px)");
    }
    if (height > 5) {
        buttonGrid.style.setProperty("grid-template-rows", "repeat(" + height + ", " + 500 / height + "px)");
    } else {
        buttonGrid.style.setProperty("grid-template-rows", "repeat(" + height + ", 100px)");
    }

    // appends the elements
    for (var i = 0; i < grid.length; i++) {
        buttonGrid.appendChild(grid[i]);
    }

    var container = document.getElementById("button-container");
    container.appendChild(buttonGrid);
}