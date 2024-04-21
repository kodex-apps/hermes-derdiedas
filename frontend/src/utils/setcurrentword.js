// Changes the currentWord key of the Word object in an array to true (and the previous one to false) given an index
const setCurrentWord(wordList, index) {
	wordList.forEach((word, wordIndex) => {
		if(wordIndex == index-1) word.isCurrentWord = false;
		if(wordIndex == index) {word.isCurrentWord = true; break;}
	}
}

export default setCurrentWord;
