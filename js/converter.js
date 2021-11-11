'use strict';
import { checkCurrency } from './selects.js';
import { onDebug } from './index.js';

const getInputs = document.querySelectorAll('input[type="text"]');

async function convertCurrency(event){
	const currencies = checkCurrency();
	const elementId = event.target.id;
	const value = Number(event.target.value.replace(',','.')); 
	let inputToShowValue, quotation;

	if(elementId === 'amount1'){
		quotation = !onDebug ? await getQuotations(currencies['currency1'], currencies['currency2']) : 5;
		inputToShowValue = getInputs[1];
	} else {
		quotation = !onDebug ? await getQuotations(currencies['currency2'], currencies['currency1']) : 5;

		inputToShowValue = getInputs[0];
	}
	
	const valueConverted = (value * quotation).toFixed(2).replace('.',',');
	inputToShowValue.value = valueConverted;
}

async function handleSelectChange(){
	const currencies = checkCurrency();
	const value = Number(getInputs[0].value.replace(',','.'));

	const quotation = !onDebug ? await getQuotations(currencies['currency1'], currencies['currency2']) : 5;
	const valueConverted = (value * Number(quotation)).toFixed(2).replace('.',',');
	getInputs[1].value = valueConverted;
}

async function getQuotations(fromCurrency, toCurrency){
	const url = `https://economia.awesomeapi.com.br/json/last/${fromCurrency}-${toCurrency}`;
	const data = await fetch(url);
	const dataJSON = await data.json();
	
	const quotation = dataJSON[fromCurrency+toCurrency].bid;
	return quotation;
}

export { convertCurrency, handleSelectChange, getInputs };
