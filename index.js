// DOM Elements 
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const valueEl = document.querySelector('.value')

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [

  number0El, number1El,number2El, number3El,
  number4El, number5El, number6El,number7El,
  number8El,number9El,
]

// variables 
let valueStrInMemory = null
let operatorInMemory = null

//functions 

const getValueAsStr = () => valueEl.textContent.split(',').join('')

const getValueAsNum = () => {
 return parseFloat(getValueAsStr())
}


const  setStrAsValue = (valueStr)=> {

  if(valueStr[valueStr.length -1] === '.') {
    valueEl.textContent += '.'
      return
  }
   // Destruction
  const [wholeNumStr, decimalStr] = valueStr.split('.')

 
  
  if (decimalStr) {
     valueEl.textContent = parseFloat(wholeNumStr)
       .toLocaleString() + '.' + decimalStr
  }
  else {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString()
  }
  
} 


const getResultOfOperationstr =  ()=>{


  const  currentValueNum = getValueAsNum()
  const valueNumInMemory = parseFloat(valueStrInMemory)

  let newValueNum = getValueAsStr()

  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  }
  else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  }
  else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  }
  else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;

  }

  return newValueNum.toString()

}

const handleNumberClick = (numStr) => {

  const currentDisplayStr = getValueAsStr()

    if (currentDisplayStr === '0') {
      setStrAsValue(numStr)
    }
  // displayEl.innerHTML += numStr
  else {
     setStrAsValue(currentDisplayStr + numStr)
  } 
} 

//  TODO handle Opetarion Operation button click==========

function handleOperationClick(operation) {

  const currentValueStr = getValueAsStr();


  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');
    return;
  }
 
  valueStrInMemory = getResultOfOperationstr()
  operatorInMemory = operation
  setStrAsValue('0')

} 

//add Event listeners to functions
acEl.addEventListener('click', () => {
  setStrAsValue('0')
  valueStrInMemory = null
  operatorInMemory = null

})

pmEl.addEventListener('click', () => {
  const currentValueNum = getValueAsNum()
  const currentValueStr = getValueAsStr() 
  
  if(currentValueStr === '-0' ) return setStrAsValue('0')
  if(currentValueNum >= 0) {
    setStrAsValue("-" + currentValueStr)
  }
  else {
    setStrAsValue(currentValueStr.substring(1))
  }

 /* const currentValue = valueEl.textContent.split('');
  currentValue.pop()
  if(currentValue.length < 1) {
    setStrAsValue('0')
  } else {
     valueEl.innerHTML = currentValue.join('')
  }
   */

})

percentEl.addEventListener('click', ()=> {
  const currentValueNum = getValueAsNum()
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null
  operatorInMemory = null

})

//add Event listeners to operators

additionEl.addEventListener('click', () => {
  handleOperationClick('addition')
})
subtractionEl.addEventListener('click', () => {
  handleOperationClick('subtraction')
})
multiplicationEl.addEventListener('click', () => {
  handleOperationClick('multiplication') 
})
divisionEl.addEventListener('click', () => {
  handleOperationClick('division')
})

equalEl.addEventListener('click', () => {
  
  setStrAsValue(getResultOfOperationstr())
  valueStrInMemory  = null
  operatorInMemory  = null

})

//add Event listeners to number and decimal
for (let i = 0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString())

  })
}

decimalEl.addEventListener('click', ()=> {

  
  const currentValueStr = getValueAsStr()
  if(!currentValueStr.includes('.')) {
   setStrAsValue(currentValueStr + '.') 
     
  } 
});

// Set up the tim
const updateTime = () => {

  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  /* if (currentHour > 12) {
    currentHour -= 12;
  } */

  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}

setInterval(updateTime, 1000);
updateTime();





