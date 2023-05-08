/* let myHeaders = new Headers();
myHeaders.append("apikey", "Your API Key");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("URL", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
*/

// API_URL = "https://api.exchangeratesapi.io/v1/"
// KEY = "ghZkBof7HKUpPk8izUiGNNarxsfl7DaC"

document.addEventListener("DOMContentLoaded", function () {
    getCurrencies();
  });
  
  // API & key
  const API_URL = "https://api.exchangeratesapi.io/v1/";
  const key = "ghZkBof7HKUpPk8izUiGNNarxsfl7DaC";
  
  // Const variables
  const baseCurrency = document.querySelector(".base-currency");
  const currencyAmountInput = document.querySelector(".amount");
  const targetCurrency = document.querySelector(".target-currency");
  const convertedAmount = document.querySelector(".converted-amount");
  
  // Buttons
  const historicalRateBtn = document.getElementById("historical-rates");
  const historicalRateOutput = document.getElementById("historical-rates-container");
  const saveFavBtn = document.getElementById("save-favorite");
  
  let myHeaders = new Headers();
  myHeaders.append("apikey", key);
  
  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  
  // Function to fetch currencies
  function getCurrencies() {
    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        populateCurrencyDropdown(result.symbols);
      })
      .catch((error) => console.log("Error retrieving currencies", error));
  }
  
  // Function to populate the currency dropdown
  function populateCurrencyDropdown(symbols) {
    for (const currencyCode in symbols) {
      const option = document.createElement("option");
      option.value = currencyCode;
      option.textContent = `${currencyCode} - ${symbols[currencyCode]}`;
      baseCurrency.appendChild(option.cloneNode(true));
      targetCurrency.appendChild(option);
    }
  }
  
  // Function to fetch Exchange Rates from API
  function getExchangeRates() {
    let from = baseCurrency.value;
    let to = targetCurrency.value;
    let amount = currencyAmountInput.value;
    let url = `https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amount}`;
  
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          convertedAmount.textContent = result.result.toFixed(2);
        } else {
          console.error("Could not Convert Currency", error);
        }
      })
      .catch((error) =>
        alert("Error Fetching Exchange Rate Data", error)
      );
  }
  
  // Function to fetch Historical Exchange Rates from API for a specific date
  function getHistoricalExchangeRates() {
    let base = baseCurrency.value;
    let symbol = targetCurrency.value;
    let date = "2022-05-05";
  
    fetch(
      `https://api.apilayer.com/exchangerates_data/${date}?symbols=${symbol}&base=${base}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const historicalRate = data.rates;
        const res = Object.keys(historicalRate)[0];
  
        historicalRateOutput.innerHTML = `Historical exchange rate on ${date}: 1 ${base} = ${historicalRate[res]} ${symbol}`;
      })
      .catch((error) =>
        alert("Error fetching historical rates data", error)
      );
  }
  
  // Event Listeners
  baseCurrency.addEventListener("change", getExchangeRates);
  targetCurrency.addEventListener("change", getExchangeRates);
  currencyAmountInput.addEventListener("input", getExchangeRates);
  historicalRateBtn.addEventListener("click", getHistoricalExchangeRates);
  saveFavBtn.addEventListener("click", saveFavoritePair);
  
  // Function to Save Favorite Currency Pairs
  function saveFavoritePair() {
    const base = baseCurrency.value;
  }