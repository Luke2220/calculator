const display = document.querySelector('#display');
const digitButtons = document.querySelectorAll('.digits');
const operatorButtons = document.querySelectorAll('.operators');
const equalsBtn = document.querySelector('#operateBtn');
const clearBtn = document.querySelector('#clearBtn');
const undoBtn = document.querySelector('#undoBtn');

let userMath = '';
let lastOperater = '';
let expression;
let lastUserInput = '';
updateDisplay('0');

equalsBtn.addEventListener('click', () => {operate(userMath);})
clearBtn.addEventListener('click', () => {clear();})
undoBtn.addEventListener('click', () => {undoInput();})

digitButtons.forEach(key => {
    key.addEventListener('click', () => {updateSelectedNumber(key.textContent)});
})
operatorButtons.forEach(key => {
    key.addEventListener('click',() => {updateSelectedOperater(key.textContent)});
})

function operate(mathString)
{
    noNumbers = /[^0-9]/;
    onlyNumbers = /[0-9]/;
    expression = mathString.toString().split(" ")

    let firstnumber = '';
    let secondnumber = '';

    let addedNumbers = 0;
    
    if(expression.length >= 3)
    {
        
        expression.forEach((key, index) => 
        {
            const decimalCheck = key.split('');
            let containsDecimal = false;
            decimalCheck.forEach(key => { if (key == '.'){ containsDecimal = true}})


            if (key.match(noNumbers) == null || containsDecimal == true)
            {    
                if (firstnumber == '')
                firstnumber = key;
                else
                secondnumber = key;         
            }
            else if (key.match(onlyNumbers) == null)
            {          
                lastOperater = key;
            }


            if (secondnumber != '')
            {
                switch(lastOperater)
                {
                    case '+': 
                    addedNumbers += add(firstnumber,secondnumber);
                    break;
                    case '-': 
                    addedNumbers += subtract(firstnumber,secondnumber);
                    break;
                    case '/': 
                    addedNumbers += divide(firstnumber,secondnumber);
                    break;
                    case '*': 
                    addedNumbers += multiply(firstnumber,secondnumber);
                }
                firstnumber = '';
                secondnumber = '';
            }
            else if (index == expression.length - 1)
            {
                switch(lastOperater)
                {
                    case '+': 
                    addedNumbers += parseFloat(firstnumber);
                    break;
                    case '-': 
                    addedNumbers -= parseFloat(firstnumber);
                    break;
                    case '/': 
                    addedNumbers /= parseFloat(firstnumber);
                    break;
                    case '*': 
                    addedNumbers *= parseFloat(firstnumber);
                }
                firstnumber = '';
                secondnumber = '';
            }
            
        })
        updateDisplay(addedNumbers);
        userMath = addedNumbers.toString();
    }
}

function add(num1, num2)
{
    return parseFloat(num1) + parseFloat(num2);
}
function subtract(num1, num2)
{
    return parseFloat(num1) - parseFloat(num2);
}
function divide(num1, num2)
{
    return parseFloat(num1) / parseFloat(num2);
}
function multiply(num1, num2)
{
    return parseFloat(num1) * parseFloat(num2);
}

function updateSelectedNumber(selectedNumber)
{
    userMath += selectedNumber;
    lastUserInput = selectedNumber;
    updateDisplay(userMath);
 
  
}
function updateSelectedOperater(selectedOperater)
{
    operate(userMath);
    userMath += " " + selectedOperater + " ";
    lastUserInput = selectedOperater;
    updateDisplay(userMath);
}

function clear()
{
    userMath = '';
    lastOperater = '';
    updateDisplay('0');
}

function undoInput()
{
    userMath = userMath.trim().slice(0,-1);
    userMath = userMath.trim();
   updateDisplay(userMath);
}

function updateDisplay(newText)
{
    if(newText != '')
    {
        display.textContent = newText;
    }
    else
        display.textContent = '0';
}