"use strict";

// https://www.exchangerate-api.com/
// you need YOUR-API-KEY
const currencyURL = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/";

const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");

const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const swapBtn = document.getElementById("swap");
const rateEl = document.getElementById("rate");

// Fetch exchange rates and update the DOM
const calculate = function () {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`${currencyURL}${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
};

const swapCurrency = function () {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;

  calculate();
};

// addEventListener
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);

currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swapBtn.addEventListener("click", swapCurrency);

calculate();
