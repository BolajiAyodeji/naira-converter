const currencies = [
  {id: 'BTC', name: 'Bitcoin'},
  {id: 'USD', name: 'US Dollars'},
  {id: 'EUR', name: 'Euro'},
  {id: 'GBP', name: 'Pounds'},
  {id: 'CNY', name: 'Chinese Yuan'},
  {id: 'CZK', name: 'Czech Koruna'},
  {id: 'INR', name: 'Indian Rupee'},
  {id: 'PHP', name: 'Philippine Peso'},
  {id: 'KRW', name: 'South Korean Won'},
  {id: 'JPY', name: 'Japanese Yen'},
  {id: 'SAR', name: 'Saudi Riyal'},
  {id: 'UGX', name: 'Ugandan Shillings'},
  {id: 'KES', name: 'Kenyan Shillings'},
  {id: 'GHS', name: 'Ghanian Cedi'},
  {id: 'ZAR', name: 'South African Rand'},
  {id: 'ZMW', name: 'Zambian Kwacha'},
  {id: 'RWF', name: 'Rwandan Franc'},
  {id: 'SLL', name: 'Sierra Leonean Leone'},
  {id: 'SOS', name: 'Somali Shilling'},
  {id: 'AOA', name: 'Angolan Kwanza'},
  {id: 'BWP', name: 'Botswana Pula'},
  {id: 'ILS', name: 'Israeli New Sheqel'},
  {id: 'EGP', name: 'Egyptian Pound'}
  ];

const apiBase = 'https://free.currencyconverterapi.com/api/v6/';
const apiKey = '&apiKey=38cbf6ea7785dbd742f5';
const api = (currency) => `${apiBase}convert?q=${currency}_NGN&compact=ultra${apiKey}`;

const toast = (msg) => {
const toastr = document.querySelector('.messages');
if(!toastr) return;

toastr.textContent = msg;
if(!toastr.classList.contains('on')) {
toastr.classList.add('on');
 }
};

const doneToasting = () => {
const toastr = document.querySelector('.messages');
if(!toastr) return;

toastr.textContent = '';
toastr.classList.remove('on');
};

const conversionSucceeded = (apiResponse) => {
if(!apiResponse) {
toast(`connection error! check your network and try again ...`);
return;
}

const [value] = Object.values(apiResponse)

const btn = document.querySelector('button');
btn.removeAttribute('disabled');

const display = document.querySelector('.conversion');
const formatter = new Intl.NumberFormat(
'en-NG', { style: 'currency', currency: 'NGN' }
);

display.textContent = formatter.format(value);
doneToasting();
};


// here, determine and return the selected value
// of the SELECT element
const getSelectedCurrency = () => {
let display = document.querySelector('.select-text').value;
return display;
};

const convert = (event) => {
toast(`preparing to convert ...`);

const btn = event ?
    event.target : document.querySelector('button');

const selected = getSelectedCurrency();

if(!selected || selected.trim() === ''
 || !currencies.map(c => c.id).includes(selected)) return;

btn.setAttribute('disabled', 'disabled');
toast(`converting ...`);

const endpoint = api(selected);

// make a GET fetch call to the endpoint
// variable declared above, convert the response to JSON,
// then call conversionSucceeded and pass the JSON data to it

let getData = fetch(endpoint)
  getData.then(
    (response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(function(data) {
          for (let index in data)
          console.log('₦' + data[index]*100);
        conversionSucceeded(data);
      });
  });
};

// declare populateCurrencies here
const populateCurrencies = () => {
  let select = document.querySelector('.select-text');

  for(let i = 0; i < currencies.length; i++) {
  let optItem = currencies[i];
  let newOption = document.createElement('option');
  newOption.textContent = optItem.name;
  newOption.value = optItem.id;
  select.appendChild(newOption);
  }
}

const startApp = () => {
// call populateCurrencies here
populateCurrencies()

// add a click listener to the button here
let btn = document.querySelector('button');
btn.addEventListener('click', convert);
};

startApp();
