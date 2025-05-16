var turnf = "X"
function Wturn() {

        if (turnf == "X") {
                turnf = "O"
        }
        else if (turnf == "O") {
                turnf = "X"
        }
}
function checkWinner() {
        const winningConditions = [
                // Rows
                [row1box1i, row1box2i, row1box3i],
                [row2box1i, row2box2i, row2box3i],
                [row3box1i, row3box2i, row3box3i],
                // Columns
                [row1box1i, row2box1i, row3box1i],
                [row1box2i, row2box2i, row3box2i],
                [row1box3i, row2box3i, row3box3i],
                // Diagonals
                [row1box1i, row2box2i, row3box3i],
                [row1box3i, row2box2i, row3box1i]
        ];

        for (let condition of winningConditions) {
                const [box1, box2, box3] = condition;
                if (
                        box1.getAttribute("src") !== "Empty.png" &&
                        box1.getAttribute("src") === box2.getAttribute("src") &&
                        box2.getAttribute("src") === box3.getAttribute("src")
                ) {
                        return true; // Found a winning condition
                }
        }

        // Check for draw
        const allBoxes = [row1box1i, row1box2i, row1box3i, row2box1i, row2box2i, row2box3i, row3box1i, row3box2i, row3box3i];
        const isDraw = allBoxes.every(box => box.getAttribute("src") !== "Empty.png");

        if (isDraw) {
                return "draw"; // Game ended in a draw
        }

        return false; // No winner yet
}
function printWinner(winner) {
        var turnfpw = ""
        if (winner === true) {
                if (turnf == "O") {
                        turnfpw = "X"
                }
                else {
                        turnfpw = "O"
                }
                
                // You can replace console.log with any other action you want to perform when a player wins
        } else if (winner === "draw") {
                turnfpw = "Draw"
        }
        let whosethew = document.querySelector(".winner")
        whosethew.innerHTML = `Winner: ${turnfpw}`
}

var row1box1i = document.getElementById("ritem1")
var row1box2i = document.getElementById("ritem2")
var row1box3i = document.getElementById("ritem3")
var row2box1i = document.getElementById("sitem1")
var row2box2i = document.getElementById("sitem2")
var row2box3i = document.getElementById("sitem3")
var row3box1i = document.getElementById("titem1")
var row3box2i = document.getElementById("titem2")
var row3box3i = document.getElementById("titem3")
function namechanger() {
        var turn = document.querySelector(".turn")
        turn.innerHTML = `Turn: ${turnf}`;
}


let row1box1 = document.querySelector(".i1")
row1box1.addEventListener("click", () => {
        if (document.getElementById("ritem1").getAttribute("src") == "Empty.png") {
                row1box1i.setAttribute("src", `${turnf}.png`)
                Wturn()
                let result = checkWinner()
                printWinner(result)
        }
})
let row1box2 = document.querySelector(".i2")
row1box2.addEventListener("click", () => {
        if (document.getElementById("ritem2").getAttribute("src") == "Empty.png") {
                row1box2i.setAttribute("src", `${turnf}.png`)
                Wturn()
                let result = checkWinner()
                printWinner(result)
        }
})
let row1box3 = document.querySelector(".i3")
row1box3.addEventListener("click", () => {
        if (document.getElementById("ritem3").getAttribute("src") == "Empty.png") {
                row1box3i.setAttribute("src", `${turnf}.png`)
                Wturn()
                let result = checkWinner()
                printWinner(result)
        }
})
let row2box1 = document.querySelector(".s1")
row2box1.addEventListener("click", () => {
        if (document.getElementById("sitem1").getAttribute("src") == "Empty.png") {
                row2box1i.setAttribute("src", `${turnf}.png`)
                Wturn()
                let result = checkWinner()
                printWinner(result)
        }
})
let row2box2 = document.querySelector(".s2")
row2box2.addEventListener("click", () => {
        if (document.getElementById("sitem2").getAttribute("src") == "Empty.png") {
                row2box2i.setAttribute("src", `${turnf}.png`)
                Wturn()
                let result = checkWinner()
                printWinner(result)
        }
})
let row2box3 = document.querySelector(".s3")
row2box3.addEventListener("click", () => {
        if (document.getElementById("sitem3").getAttribute("src") == "Empty.png") {
                row2box3i.setAttribute("src", `${turnf}.png`)
                Wturn()
                let result = checkWinner()
                printWinner(result)
        }
})
let row3box1 = document.querySelector(".t1")
row3box1.addEventListener("click", () => {
        if (document.getElementById("titem1").getAttribute("src") == "Empty.png") {
                row3box1i.setAttribute("src", `${turnf}.png`)
                Wturn()
                let result = checkWinner()
                printWinner(result)
        }
})
let row3box2 = document.querySelector(".t2")
row3box2.addEventListener("click", () => {
        if (document.getElementById("titem2").getAttribute("src") == "Empty.png") {
                row3box2i.setAttribute("src", `${turnf}.png`)
                Wturn()
                let result = checkWinner()
                printWinner(result)
        }
})
let row3box3 = document.querySelector(".t3")
row3box3.addEventListener("click", () => {
        if (document.getElementById("titem3").getAttribute("src") == "Empty.png") {
                row3box3i.setAttribute("src", `${turnf}.png`)
                Wturn()
                let result = checkWinner()
                printWinner(result)
        }
})
let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
    let row1box1 = document.getElementById("ritem1");
    row1box1.setAttribute("src", "Empty.png");
    let row1box2 = document.getElementById("ritem2");
    row1box2.setAttribute("src", "Empty.png");
    let row1box3 = document.getElementById("ritem3");
    row1box3.setAttribute("src", "Empty.png");
    let row2box1 = document.getElementById("sitem1");
    row2box1.setAttribute("src", "Empty.png");
    let row2box2 = document.getElementById("sitem2");
    row2box2.setAttribute("src", "Empty.png");
    let row2box3 = document.getElementById("sitem3");
    row2box3.setAttribute("src", "Empty.png");
    let row3box1 = document.getElementById("titem1");
    row3box1.setAttribute("src", "Empty.png");
    let row3box2 = document.getElementById("titem2");
    row3box2.setAttribute("src", "Empty.png");
    let row3box3 = document.getElementById("titem3");
    row3box3.setAttribute("src", "Empty.png");
});
