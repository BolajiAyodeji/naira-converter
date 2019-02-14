"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var currencies = [{
  id: 'BTC',
  name: 'Bitcoin'
}, {
  id: 'USD',
  name: 'US Dollars'
}, {
  id: 'EUR',
  name: 'Euro'
}, {
  id: 'GBP',
  name: 'Pounds'
}, {
  id: 'CNY',
  name: 'Chinese Yuan'
}, {
  id: 'CZK',
  name: 'Czech Koruna'
}, {
  id: 'INR',
  name: 'Indian Rupee'
}, {
  id: 'PHP',
  name: 'Philippine Peso'
}, {
  id: 'KRW',
  name: 'South Korean Won'
}, {
  id: 'JPY',
  name: 'Japanese Yen'
}, {
  id: 'SAR',
  name: 'Saudi Riyal'
}, {
  id: 'UGX',
  name: 'Ugandan Shillings'
}, {
  id: 'KES',
  name: 'Kenyan Shillings'
}, {
  id: 'GHS',
  name: 'Ghanian Cedi'
}, {
  id: 'ZAR',
  name: 'South African Rand'
}, {
  id: 'ZMW',
  name: 'Zambian Kwacha'
}, {
  id: 'RWF',
  name: 'Rwandan Franc'
}, {
  id: 'SLL',
  name: 'Sierra Leonean Leone'
}, {
  id: 'SOS',
  name: 'Somali Shilling'
}, {
  id: 'AOA',
  name: 'Angolan Kwanza'
}, {
  id: 'BWP',
  name: 'Botswana Pula'
}, {
  id: 'ILS',
  name: 'Israeli New Sheqel'
}, {
  id: 'EGP',
  name: 'Egyptian Pound'
}];
var apiBase = 'https://free.currencyconverterapi.com/api/v6/';
var apiKey = '&apiKey=38cbf6ea7785dbd742f5';

var api = function api(currency) {
  return "".concat(apiBase, "convert?q=").concat(currency, "_NGN&compact=ultra").concat(apiKey);
};

var toast = function toast(msg) {
  var toastr = document.querySelector('.messages');
  if (!toastr) return;
  toastr.textContent = msg;

  if (!toastr.classList.contains('on')) {
    toastr.classList.add('on');
  }
};

var doneToasting = function doneToasting() {
  var toastr = document.querySelector('.messages');
  if (!toastr) return;
  toastr.textContent = '';
  toastr.classList.remove('on');
};

var conversionSucceeded = function conversionSucceeded(apiResponse) {
  if (!apiResponse) {
    toast("connection error! check your network and try again ...");
    return;
  }

  var _Object$values = Object.values(apiResponse),
      _Object$values2 = _slicedToArray(_Object$values, 1),
      value = _Object$values2[0];

  var btn = document.querySelector('button');
  btn.removeAttribute('disabled');
  var display = document.querySelector('.conversion');
  var formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  });
  var inputAmount = document.getElementById('inputAmount').value;
  var valMsg = document.querySelector('.messages'); //Check if no value is passed

  if (!inputAmount) {
    alert('❌ Enter amount first!');
  } //Check if inputAmount number contains unwanted characters


  if (inputAmount.match(/[^0-9]/)) {
    alert('❌ Input contains unwanted characters');
  } else {
    display.textContent = formatter.format(value * inputAmount);
    doneToasting();
  }
}; // Determine and return the selected value of the SELECT element


var getSelectedCurrency = function getSelectedCurrency() {
  var display = document.querySelector('.select-text').value;
  return display;
};

var convert = function convert(event) {
  toast("preparing to convert ...");
  var btn = event ? event.target : document.querySelector('button');
  var selected = getSelectedCurrency();
  if (!selected || selected.trim() === '' || !currencies.map(function (c) {
    return c.id;
  }).includes(selected)) return;
  btn.setAttribute('disabled', 'disabled');
  toast("converting ...");
  var endpoint = api(selected); // GET fetch call to the endpoint

  var getData = fetch(endpoint);
  getData.then(function (response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }

    response.json().then(function (data) {
      for (var index in data) {
        conversionSucceeded(data);
      }
    });
  });
}; // populate the SELECT ELEMENT with Currencies


var populateCurrencies = function populateCurrencies() {
  var select = document.querySelector('.select-text');

  for (var i = 0; i < currencies.length; i++) {
    var optItem = currencies[i];
    var newOption = document.createElement('option');
    newOption.textContent = optItem.name;
    newOption.value = optItem.id;
    select.appendChild(newOption);
  }
};

var startApp = function startApp() {
  populateCurrencies();
  var btn = document.querySelector('button');
  btn.addEventListener('click', convert);
};

startApp();