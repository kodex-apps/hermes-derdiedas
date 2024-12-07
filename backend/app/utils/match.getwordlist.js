const fs = require('node:fs');

function getWordList(level, wordsPerMatch) {
	let rawWordList;
	let wordList = [];
	let data;

	try {
		if (level === 'A1') data = fs.readFileSync('app/utils/wortschatz', 'utf8');
		else if (level === 'A2') data = fs.readFileSync('app/utils/wortschatz-a2', 'utf8');
		else if (level === 'B1') data = fs.readFileSync('app/utils/wortschatz-b1', 'utf8');
		// Get the full word list and assign 10 random of them to our wordList
		let fullWordList = data.split("\n").slice(0, -1).sort(() => 0.5 - Math.random());
		// Getting 10 strings of words from the random fullWordList
		rawWordList = fullWordList.slice(0, wordsPerMatch);
	} catch (err) {
		console.error(err); return;
	}

	// Add aditional data for the app to each word
	rawWordList.forEach(e => {
		currentWord = e.replace(' ', '').split('$');
		wordList.push({	article: currentWord[0], word: currentWord[1], isCurrentWord: false, isCorrectWord: null});
	});
	// Set the first word to be the current word (match.js expects one to have it)
	wordList[0].isCurrentWord = true;

	return wordList;
}

module.exports = getWordList;
