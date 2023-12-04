const screenMainRegion = document.querySelector(".main-region");
const screenOtherRegion = document.querySelector(".other-region");
const numberBtns = Array.from(document.querySelectorAll(".number-btn"));
const operatorBtns = Array.from(document.querySelectorAll(".operator-btn"));
const dotBtn = document.querySelector(".dot-btn");
const equalBtn = document.querySelector(".equal-btn");
const clearBtn = document.querySelector(".clear-btn");
const backspaceBtn = document.querySelector(".backspace-btn");


let operator = null;
let op1 = null;
let op2 = null;
let result = 0;
let dotUsed = false;

const numberKeys = ["1","2","3","4","5","6","7","8","9","0"];
const operatorKeys = ["+","-","*","/","^","%"];



function handleNumberClick(numberArg){
    if(result !== null){
        result = null;
        screenMainRegion.textContent = numberArg;
        return;
    }
    screenMainRegion.textContent += numberArg;
}
function handleOperatorClick(operatorArg){
    dotUsed = false;
    if(op1 === null){
        op1 = +screenMainRegion.textContent;
        operator = operatorArg;
        screenOtherRegion.textContent = screenMainRegion.textContent + " " + operator + " ";
        screenMainRegion.textContent = '';
    } else if(op2 === null) {
        op2 = +screenMainRegion.textContent;
        if(operator === null){
            operator = operatorArg
        }
        result = operate(op1, operator, op2);
        operator = operatorArg
        screenOtherRegion.textContent += op2 + " " + operator + " ";
        screenMainRegion.textContent = result;
        op2 = null;
        op1 = result;
    }

}

function handleDotClick(){
    if(!dotUsed){
        screenMainRegion.textContent += "."
        dotUsed = true;
    }
    return;
}

function handleBackspaceClick(){
    if(screenMainRegion.textContent == ''){
        return;
    }
    const deletedChar = screenMainRegion.textContent[screenMainRegion.textContent.length - 1];
    const newContent = screenMainRegion.textContent.slice(0, screenMainRegion.textContent.length - 1);

    console.log(deletedChar, newContent);

    screenMainRegion.textContent = newContent;
    if(deletedChar === "."){
        dotUsed = false;
    }
}

function clearScreen(){
    screenMainRegion.textContent = "";
    screenOtherRegion.textContent = "";
}
function clearVariables(){
    op1 = null;
    op2 = null;
    operator = null;
}

function add(x,y){
    return x+y;
}
function subtract(x,y){
    return x-y;
}
function multiply(x,y){
    return x*y;
}
function divide(x,y){
    if(y !== 0){
        return x/y;
    }
    return "division by zero";
}
function modulo(x,y){
    if(y === 0){
        return "division by zero";
    }
    return x%y;
}
function power(x,y){
    return Math.pow(x,y);
}

function operate(x, oper, y){

    let result;

    switch(oper){
        case "+":
            result = add(x,y);
            break;
        case "-":
            result = subtract(x,y);
            break;
        case "/":
            result = divide(x,y);
            break;
        case "×":
            result = multiply(x,y);
            break;
        case "%":
            result = modulo(x,y);
            break;
        case "^":
            result = power(x,y);
            break;
    }

    return parseFloat(result.toFixed(4));
}

function calculate(){

    op2 = +screenMainRegion.textContent;
    result = operate(op1, operator, op2);
    screenOtherRegion.textContent += op2 + " = ";
    screenMainRegion.textContent = result;
    if(screenMainRegion.textContent.includes(".")){
        dotUsed = true;
    }
    operator = null;
    op2 = null;
    op1 = null;
}


numberBtns.forEach(btn => btn.addEventListener("click", e => {
    handleNumberClick(e.target.dataset.number);
}
));
operatorBtns.forEach(op => op.addEventListener("click", e => {
    handleOperatorClick(e.target.dataset.operator);
}))

clearBtn.addEventListener("click", () => {
    clearScreen();
    clearVariables();
    dotUsed = false;
});

equalBtn.addEventListener("click", () => {
    dotUsed = false;
    if(operator !== null){
        calculate();
    }
});
dotBtn.addEventListener("click", handleDotClick);
backspaceBtn.addEventListener("click", handleBackspaceClick);
document.addEventListener("keydown", (e) => {

    if(numberKeys.includes(e.key)){
        handleNumberClick(e.key);
    } else if (operatorKeys.includes(e.key)){
        e.preventDefault();
        handleOperatorClick(e.key);
    } else if (e.key === "="){
        dotUsed = false;
        if(operator !== null){
            calculate();
        }
    } else if(e.key === "Backspace"){
        handleBackspaceClick();
    } else if(e.key === '.'){
        handleDotClick();
    }
});