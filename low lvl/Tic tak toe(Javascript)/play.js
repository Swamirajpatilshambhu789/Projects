function switchXO(inputStr) {
    if (inputStr === "X") {
        return "O";
    } else if (inputStr === "O") {
        return "X";
    } else {
        return "Input is neither 'X' nor 'O'.";
    }
}

// Example usage:
let input = "X";
let result = switchXO(input);
console.log(result);
