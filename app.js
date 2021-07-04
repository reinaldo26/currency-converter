const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');
const currenciesEl = document.querySelector('[data-js="currencies-container"]');

const url = 'https://v6.exchangerate-api.com/v6/aad6bdf9769cae9605f03cc0/latest/USD';

const getErrorMessage = errorType => ({
  'unsupported-code' : 'A moeda não existe em nosso banco de dados.'
})[errorType] || 'Não foi possivel obter as informações.';

const fetchExchangeRate = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Sua conexão falhou.');
    }

    const exchangeRateData = await response.json();

    if (exchangeRateData.result === 'error') {
      throw new Error(getErrorMessage(exchangeRateData['error-type']));
    }
  } catch(err) {
    alert(err.message);
    const div = document.createElement('div');
    const button = document.createElement('button');

    div.textContent = err.message;
    div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade show');
    button.classList.add('btn-close');

    div.appendChild(button);
    currenciesEl.insertAdjacentElement('afterend', div);
  }
}

fetchExchangeRate();

const option = `<option>USD</option>`;
currencyOneEl.innerHTML = option;