import Dictionary from './Dictionary.js';

import { throttle, removeAllChildNodes, createElementUnsafe } from "./util.js";

// /** @type {HTMLInputElement} */ 
// const datalistEl = document.getElementById("datalist");

const { default: words } = await import('./words-large.js');
// for (const word of words) {
//     const optionEl = document.createElement("option");
//     optionEl.innerText = word;
//     datalistEl?.appendChild(optionEl);
// }

const dict = new Dictionary(words);
const MAX_DISPLAY = 1000;

const inputEl = document.getElementById("search-input");
const handleSearchInput = (ev) => {
    const query = inputEl?.value.trim();
    const results = dict.search(query);
    setOutput(results);
    setMessage(`Found <b>${results.length < MAX_DISPLAY ? results.length : MAX_DISPLAY + "+"} results</b> containing <b>"${query}"</b>.</b>`)
}
const debounced = throttle(handleSearchInput, 300);
inputEl?.addEventListener("input", () => {
    debounced();
    setMessage(`Processing...`);
});

const outMessageEl = document.getElementById("out-message");
const outputEl = document.getElementById("out-words");


const setMessage = (msgHTML) => {
    outMessageEl.innerHTML = msgHTML;
}
/**
 * @param {string[]} results 
 * @returns 
 */ 
const setOutput = (results) => {
    if (outputEl?.children.length == results.length) {
        // just assume nothing changed
        return;
    }
    removeAllChildNodes(outputEl);
    for (let i = 0; i < Math.min(results.length, MAX_DISPLAY); i++) {
        const li = createElementUnsafe("li", results[i]);
        outputEl?.appendChild(li);
    }
    if (results.length > MAX_DISPLAY) {
        const li = createElementUnsafe("li", `<b>${results.length - MAX_DISPLAY}</b> more results not shown.`);
        outputEl?.appendChild(li);
    }
}



handleSearchInput();
