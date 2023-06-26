const MAX_NUMBER = 10
const MIN_NUMBER = -10
const STEP_AMOUNT = 1

const currentNumber = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]')

const subtractHandler = () => {
    const newValue = parseInt(currentNumber.value) - STEP_AMOUNT
    currentNumber.value = newValue

    if (add.disabled === true) {
        add.disabled = false
    }
    if (newValue <= MIN_NUMBER) {
        subtract.disabled = true
    }

}
const addHandler = () => {
    const newValue = parseInt(currentNumber.value) + STEP_AMOUNT
    currentNumber.value = newValue

    if (subtract.disabled === true) {
        subtract.disabled = false
    }
    if (newValue >= MAX_NUMBER) {
        add.disabled = true
    }
}

const resetHandler = () => {

    if (currentNumber.value < 0 || currentNumber.value > 0) {
        currentNumber.value = 0
        subtract.disabled = false
        add.disabled = false
        setTimeout(function() {
            alert("counter has been reset");
        },10)
    }
}

subtract.addEventListener('click', subtractHandler)
add.addEventListener('click', addHandler)
reset.addEventListener('click', resetHandler)