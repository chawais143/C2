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

	

	delete() {

	}


	appendNumber(number) {
       this.currentOperand = this.currentOperand.toString()
	}


	chooseOperation(operation){

	}



	compute() {

	}


	updateDisplay() {
      this.currentoperandTextElement.innerText = this.currentOperand
	}
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-number]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})