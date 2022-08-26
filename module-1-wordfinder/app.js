import Dictionary from './Dictionary.js';

import { debounce, removeAllChildNodes, createElementUnsafe } from "./util.js";

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
    setMessage(`Found <b>${results.length < MAX_DISPLAY ? results.length : MAX_DISPLAY + "+"}</b> containing <b>"${query}"</b>.</b>`)
}
inputEl?.addEventListener("input", debounce(handleSearchInput, 500));

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
        const li = createElementUnsafe("li", `and <b>${results.length - MAX_DISPLAY}</b> more...`);
        outputEl?.appendChild(li);
    }
}



handleSearchInput();
