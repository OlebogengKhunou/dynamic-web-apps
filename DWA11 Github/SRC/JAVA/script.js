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

    subscribe(observer) {
        this.observers.push(observer);
        return () => {
            this.unsubscribe(observer);
        };
    },

    unsubscribe(observer) {
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

    dispatch(action) {
        switch (action.type) {
            case 'INCREMENT':
                this.count++;
                // currentNumber.value = this.count // incrementing the number on the counter based on the dispatch.
                break;
            case 'DECREMENT':
                this.count--;
                // currentNumber.value = this.count // decrementing the number on the counter based on the dispatch.
                break;
            case 'RESET':
                this.count = action.payload || 0;
                break;
            default:
                break;
        }
        this.notifyObservers()
    },

    getState() {
        return this.count;
    }
};

// Observer component
class Observer {
    constructor() {
        this.update = this.update.bind(this);
        this.unsubscribe = null;
    }

    subscribeToStore() {
        this.unsubscribe = store.subscribe(this);
    }

    unsubscribeFromStore() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    update(count) {
        // Handle the updated count
        console.log('Updated count:', count);
    }
}

// Usage
const observer1 = new Observer();
const observer2 = new Observer();
observer1.subscribeToStore();// added to store
observer1.unsubscribeFromStore();// removed from store
observer2.subscribeToStore();//added to store (currently)

console.log(`State: ${store.getState()}`)
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.dispatch({ type: 'RESET' });


//dispatch when a button is clicked
/*function handleIncrement() {
    store.dispatch({ type: 'INCREMENT'});
    if (subtract.disabled === true) {
        subtract.disabled = false
    }
    if (currentNumber.value >= MAX_NUMBER) {
        add.disabled = true
    }
}

function handleDecrement() {
    store.dispatch({ type: 'DECREMENT'});
    if (add.disabled === true) {
        add.disabled = false
    }
    if (currentNumber.value <= MIN_NUMBER) {
        subtract.disabled = true
    }
}

function handleReset() {
    store.dispatch({ type: 'RESET'});
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
*/

