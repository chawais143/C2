class Calculator {
	constructor(previousoperandTextElement, currentoperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}

	clear() {                     
       this.currentOperand = ''
       this.previousOperand = ''
       this.operation = undefined
	}

	

	delete() {                    // delete function ma loop ke index ko target kia ha tu ya uski value null return kare ga                           
      this.currentOperand = this.currentOperand.toString().slice(0, -1)     
	}


	appendNumber(number) {            // agar hum decimal number ko click  kare tu uske bad koi bhi value ajay tu ya dobara use nhi hoga
		if (number === '.' && this.currentOperand.includes('.')) return
       this.currentOperand = this.currentOperand.toString() + number.toString()
	}


	chooseOperation(operation){  //   jab hum opertaion ko use kare tu wo current value ko plus karde previous value ma
		if (this.currentOperand === '') return
		if (this.previousOperand !== '') {
			this.compute()
		}
       this.operation = operation
       this.previousOperand = this.currentOperand
       this.currentOperand = ''
	}



	compute() {            // is function ma hum ne call kia ha ke agar hum koi bhi operation use kare tu break ho jay aur uper value ke sath show ho jay
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      	switch (this.operation) {
      		case '+':
      		 computation = prev + current
      		 break
      		case '-':
      		 computation = prev - current
      		 break
      	    case '*':
      		 computation = prev * current
      		 break
      		case '÷':
      		 computation = prev / current
      		 break
      		default:
      		 return

      	}
      	this.currentOperand = computation
      	this.operation = undefined
      	this.previousOperand = ''
	}


	getDisplayNumber(number) {   // is ma const var banay ha iske index ko first se le ke second last tak target kia ha iski value null aye gi
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay
		if (isNaN(integerDigits)) {
			integerDisplay = ''
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0 })
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay
		}
	}


	updateDisplay() {                                          // is function ma currentoperand ki value diplay number ke equal ha is ma 2 hi vlues aye gi true ya false
      this.currentOperandTextElement.innerText = 
      this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
      	 this.previousOperandTextElement.innerText = 
      	  `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
      	 this.previousOperandTextElement.innerText = ''
      }
      
	}
}


const numberButtons = document.querySelectorAll('[data-number]')       //var bana ke unko attribute dia ha jo html ma banay ha aur iski value string ma call ki ha
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {   // agar hum number button pe click kare tu iska inner text ajay ga
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})


operationButtons.forEach(button => {   //operation button pe agar hum click kare tu iska inner text ajay ga
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

                
equalsButtons.addEventListener('click', ()=> {       //agar hum equal ke button pe click kare tu ya compute ki aur update display ki value ko plus kare ga
	calculator.compute()
    calculator.updateDisplay()
})


allClearButtons.addEventListener('click', ()=> {    //agarhum clear ke button pe click kare tu iski value null aye gi
	calculator.clear()
    calculator.updateDisplay()
})


deleteButtons.addEventListener('click', ()=> {     // agarhum delete buuton pe click kare ge tu ya operation ho ya number tu ya usa  1 1 karke delete kare ga 
	calculator.delete()
    calculator.updateDisplay()
})