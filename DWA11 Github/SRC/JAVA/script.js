const MAX_NUMBER = 10
const MIN_NUMBER = -10
const STEP_AMOUNT = 1

const currentNumber = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]')

// Global store
const store = {
    count: currentNumber.value,
    observers: [],

    addObserver(observer) {
        this.observers.push(observer);
    },

    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    },

    notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this.count);
        }
    },

    reset(value = 0) {
        this.count = value;
        this.notifyObservers();
    },

    getState() {
        return this.count;
    },

    increment() {
        this.count++;
        this.notifyObservers();
        currentNumber.value = this.count
    },

    decrement() {
        this.count--;
        this.notifyObservers();
        currentNumber.value = this.count
    }
};

// Observer component
class Observer {
    constructor() {
        store.addObserver(this);
    }

    update(count) {
        // Handle the updated count
        console.log('Updated count:', count);
    }
}

// Usage
const observer1 = new Observer();

console.log(`Intial Count: ${store.getState()}`)

function handleIncrement() {
    if (subtract.disabled === true) {
        subtract.disabled = false
    }
    if (currentNumber.value < MAX_NUMBER) {
        store.increment();
    }
    if (currentNumber.value >= MAX_NUMBER) {
        add.disabled = true
    }

}

function handleDecrement() {
    if (add.disabled === true) {
        add.disabled = false
    }
    if (currentNumber.value > MIN_NUMBER) {
        store.decrement();
    }
    if (currentNumber.value <= MIN_NUMBER) {
        subtract.disabled = true
    }
}

function handleReset() {
    store.reset();
    currentNumber.value = 0
    add.disabled = false
    subtract.disabled = false
    setTimeout(function () {
        alert("counter has been reset");
    }, 10)
}

subtract.addEventListener('click', handleDecrement)
add.addEventListener('click', handleIncrement)
reset.addEventListener('click', handleReset)


