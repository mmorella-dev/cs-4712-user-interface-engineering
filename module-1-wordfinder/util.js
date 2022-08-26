/**
 *
 * @param {(any) => (any)} callback The function to execute
 * @param {number} wait timeout in ms
 * @returns {() => (void)}
 */
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

/**
 *
 * @param {string} tagName
 * @param {string} innerHTML
 * @param {string[]} classes
 * @returns {HTMLElement} The element created
 */
const createElementUnsafe = (tagName, innerHTML = "", classes = []) => {
  const el = document.createElement(tagName)
  el.innerHTML = innerHTML
  el.className = classes.join(' ')
  return el
}

/**
 *
 * @param {Element} parent
 */
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

export { removeAllChildNodes, debounce, createElementUnsafe }
