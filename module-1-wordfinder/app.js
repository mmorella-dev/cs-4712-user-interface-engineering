import Dictionary from './Dictionary.js';
import { throttle, removeAllChildNodes, createElementUnsafe } from './util.js';

// Initialize HTML elements

/** @type {HTMLInputElement?} */
const searchInput = document.querySelector('input#search-input');
/** @type {HTMLButtonElement?} */
const clearButton = document.querySelector('button#clear-button');
const messageEl = document.querySelector('#out-message');
const outputEl = document.querySelector('#out-words');
if (!searchInput || !messageEl || !outputEl || !clearButton)
    throw new Error('DOM ID does not exist.');

// Parse long word list

const { default: words } = await import('./words-large.js');
const dictionary = new Dictionary(words);

// Event listeners

const handleSearchInput = throttle(function (ev) {
    const query = this?.value.trim() ?? '';
    const results = dictionary.search(query);
    outputEl.innerHTML = results.join('\n');
    const count = results.length.toLocaleString();
    if (!query) {
        messageEl.innerHTML = `Showing all <b>${count} words.</b>`;
    } else {
        messageEl.innerHTML = `Found <b>${count} results</b> containing <b>"${query}"</b>.`;
    }
}, 300);

searchInput.addEventListener('input', function () {
    messageEl.innerHTML = `Processing...`;
    handleSearchInput.apply(this, arguments);
});
handleSearchInput();

clearButton.addEventListener('click', () => {
    searchInput.value = '';
    handleSearchInput();
});
