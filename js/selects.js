'use strict';
const getSelects = document.querySelectorAll('select');
let previousCurrencies = { 
	currency1: getSelects[0].value, 
	currency2: getSelects[1].value 
};

function checkCurrency(event){
	const currentCurrencies = getCurrentCurrencies();
	const areEqualOptions = currentCurrencies['currency1'] === currentCurrencies['currency2'];
	if(areEqualOptions){
		changeOption(currentCurrencies, previousCurrencies, event);
	}

	previousCurrencies = currentCurrencies;
	return currentCurrencies;
}

function getCurrentCurrencies(){
	const currencies = {};
	getSelects.forEach((_, i) => { 
		currencies[`currency${i+1}`] = getSelects[i].value;
	});
	return currencies;
}

function changeOption(currentCurrencies, previousCurrencies, event){
	const elementId = event.target.id;
	if(elementId !== 'currency1'){
		getSelects[0].value = previousCurrencies['currency2'];
		currentCurrencies['currency1'] = previousCurrencies['currency2'];
	} else {
		getSelects[1].value = previousCurrencies['currency1'];
		currentCurrencies['currency2'] = previousCurrencies['currency1'];
	}
}

export { checkCurrency, getSelects };
