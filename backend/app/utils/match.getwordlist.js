const fs = require('node:fs');

function getWordList() {
	let rawWordList;
	let wordList = [];

	try {
		const data = fs.readFileSync('app/utils/wortschatz', 'utf8');
		// Get the full word list and assign 10 random of them to our wordList
		let fullWordList = data.splice(-1).split("\n").sort(() => 0.5 - Math.random());
		// Getting 10 strings of words from the random fullWordList
		rawWordList = fullWordList.slice(0, 10);
		console.log("Raw World List: ");
		console.log(rawWordList);
	} catch (err) {
		console.error(err); return;
	}

	// Add aditional data for the app to each word
	rawWordList.forEach(e => {
		currentWord = e.split(' ');
		wordList.push({	article: currentWord[0], word: currentWord[1], isCurrentWord: false, isCorrectWord: null});
	});
	// Set the first word to be the current word (match.js expects one to have it)
	wordList[0].isCurrentWord = true;

	console.log("Final Word List: ");
	console.log(wordList);

	return wordList;
}

module.exports = getWordList;
