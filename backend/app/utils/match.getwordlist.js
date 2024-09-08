const fs = require('node:fs');

function getWordList() {
	let wordList = [];

	// Get the full word list and assign 10 random of them to our wordList
	fs.readFile('./wordlist', 'utf8', (err, data) => {
	if (err) { console.error(err); return; }
	let fullWordList = data.split("\n").sort(() => 0.5 - Math.random());

	// Getting 10 strings of words from the random fullWordList
	rawWordList = fullWordList.slice(0, num);
	console.log("Raw World List: ");
	console.log(rawWordList);
	}

	// Add aditional data for the app to each word
	rawWordList.forEach(e => {
		currentWord = e.split(' ');
		wordList.push({	article: word[0], word: word[1], isCurrentWord: false, isCorrectWord: null});
	}
	wordList[0].isCurrentWord = true;

	console.log("Final Word List: ");
	console.log(wordList);
}
