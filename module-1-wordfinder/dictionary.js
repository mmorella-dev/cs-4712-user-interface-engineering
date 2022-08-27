/**
 * Dictionary is a very simple class that allows you to search over a list of
 * words. It is constructed from an array of strings:
 *
 *   var data = ["a", "bad", "cat", "dog"];
 *   var dict = new Dictionary(data);
 *
 * Once the dictionary has been instantiated, you can run a simple search over
 * it. Using the previous dictionary as an example:
 *
 *   dict.search("a") => ["a", "bad", "cat"]
 *
 */
class Dictionary {
	/** @type {string[]} */
	#words;
	/**
	 * @param {string[]} words the array of words to construct the dictionary with
 	 * @returns a newly created dictionary
	 */
	constructor(words) {
		this.#words = words;
	}
	/**
	 * Searches over this dictionary for the given query string. A word will
	 * match if any substring of it matches the query. It is case-insensitive.
	 *
	 * @param {string} query the substring to search for
	 * @returns an array of words contain the query
	 */
	search(query) {
		return this.#words.filter((w) => w.toLowerCase().includes(query.toLowerCase()));
	}
	/**
	 * @returns {number} the number of words in this dictionary
	 */
	size() {
		return this.#words.length;
	}
	/**
	 * Returns an array of all of the words in this dictionary
	 * @returns {string[]} 
	 */
	all() {
		return this.#words;
	}
}

export default Dictionary;
