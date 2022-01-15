'use strict';
import { convertCurrency, handleSelectChange, getInputs } from './converter.js';
import { checkCurrency, getSelects } from './selects.js';

const onDebug = false;

function registerEvents() {
	getSelects.forEach(selects => selects.addEventListener('change', (event) => {
		checkCurrency(event);
		handleSelectChange(event);
	}));

	getInputs.forEach((inputs) => inputs.addEventListener('input', (event) => {
		convertCurrency(event);
	}));
}

window.addEventListener('load', registerEvents);
export { onDebug };
