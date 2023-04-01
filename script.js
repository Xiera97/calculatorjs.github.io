const display = document.getElementById("display");
const clearBtn = document.getElementById("clear");
const backspaceBtn = document.getElementById("backspace");
const equalBtn = document.getElementById("equal");
const operatorBtns = document.querySelectorAll(".btn-operator");
const numberBtns = document.querySelectorAll(".btn-number");

let currentNumber = "";
let previousNumber = "";
let currentOperator = null;

function clear() {
  currentNumber = "";
  previousNumber = "";
  currentOperator = null;
  updateDisplay();
}

function updateDisplay() {
  display.innerText = currentNumber || "0";
}

function appendNumber(number) {
  if (number === "." && currentNumber.includes(".")) return;
  currentNumber += number;
  updateDisplay();
}

function chooseOperator(operator) {
  if (currentOperator) calculate();
  currentOperator = operator;
  previousNumber = currentNumber;
  currentNumber = "";
}

function calculate() {
  let result;
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);
  if (isNaN(prev) || isNaN(current)) return;
  switch (currentOperator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentNumber = result.toString();
  currentOperator = null;
  previousNumber = "";
  updateDisplay();
}

function backspace() {
  currentNumber = currentNumber.slice(0, -1);
  updateDisplay();
}

function addEventListeners() {
  clearBtn.addEventListener("click", clear);
  backspaceBtn.addEventListener("click", backspace);
  equalBtn.addEventListener("click", calculate);
  operatorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      chooseOperator(btn.id);
    });
  });
  numberBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      appendNumber(btn.innerText);
    });
  });
}

addEventListeners();
