// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");
const comment = document.querySelector('[data-result="data-result"]')

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  result.innerHTML = `${Math.floor(dividend / divider)}`;

  if (result.innerHTML === 'NaN' || dividend === '' || divider === '') {
    result.innerHTML = 'Division not performed. Both values are required in inputs. Try again'
  }
  try {
    if (dividend < 0 || divider < 0) {
      throw 'Division not performed. Invalid number provided. Try again'
    }
    else if (isNaN(dividend) || isNaN(divider)) {
      throw document.body.innerHTML = 'Something critical went wrong. Please reload the page'
    }
  } catch (error) {
    result.innerHTML = error
    throw error
  }

});