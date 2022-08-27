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

const inputEl = document.getElementById("search-input");


const handleSearchInput = function(ev) {
    const query = this?.value.trim() || "";
    const results = dict.search(query);
    setOutput(results);
    const count = results.length.toLocaleString();
    if (!query) {
        setMessage(`Showing all <b>${count} words.</b>`)
    } else {
        setMessage(`Found <b>${count} results</b> containing <b>"${query}"</b>.`);
    }
}
const debounced = throttle(handleSearchInput, 300);
inputEl?.addEventListener("input", debounced);
inputEl?.addEventListener("input", () => setMessage(`Processing...`));

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
    outputEl.innerHTML = results.join("\n");
}

const clearButtonEl = document.querySelector("#clear-button");
clearButtonEl.addEventListener("click", () => {
    inputEl.value = "";
    handleSearchInput();
})

handleSearchInput();
