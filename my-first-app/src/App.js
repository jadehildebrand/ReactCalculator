import logo from './logo.svg';
import './App.css';

const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } 
  else {
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
  // for debugging
  console.log(calculator);
}

function inputDecimal(dot) {
  // LABEL 12
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  // execute only if there is no existing decimal point
  if (!calculator.displayValue.includes(dot)) {
    // append decimal point to the string
    calculator.displayValue += dot;
  }
}

// LABEL 4:
function handleOperator(nextOperator) {
  // unpack the calculator object literal
  const { firstOperand, displayValue, operator } = calculator;

  // convert the string value to floating point
  const inputValue = parseFloat(displayValue);
  console.log(`HERE ${inputValue}`);

  //LABEL 9:
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  // if firstOperand is null and input is valid update the key:value pair
  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    // LABEL 8
    console.log(`inside computations`);
    const result = calculate(firstOperand, inputValue, operator);
    console.log(`result is ${result}`);

    //LABEL 13: fix floating point precision
    // calculator.displayValue = String(result);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

  //for debugging
  console.log(calculator);
}

// LABEL 7:
function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
      break;
    case "-":
      return firstOperand - secondOperand;
      break;
    case "*":
      return firstOperand * secondOperand;
      break;
    case "/":
      return firstOperand / secondOperand;
      break;
    default:
      console.log("incorrect operator !!");
      break;
  }
  return secondOperand;
  // GOTO LABEL 8
}

// Update the display area of the calculator
function updateDisplay() {
  console.log(`INSIDE UPDATE DISPLAY ()`);
  console.log(`current display value is ${calculator.displayValue}`);
  // select html element for display and store it in a variable
  const display = document.querySelector(".calculator-screen");
  //   Set the value of this element with value stored in calculator.displayValue
  display.value = calculator.displayValue;
}


// Handling event: Button clicks
// 9 digits, 5 operators (+ - * / =), one decimal and one All Clear buttn
// Algo: grab the html elements and associate it with method .addEventListner('eventName', callBk Function)

// grabbing all keys and store it in a variable
const keys = document.querySelector(".calculator-keys");

keys.addEventListener("click", (e) => {
  const { target } = e;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "all-clear":
      resetCalculator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }
  updateDisplay();
});


function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
  // LABEL 11
}
export default App;
