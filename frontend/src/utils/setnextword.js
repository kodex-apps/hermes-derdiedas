// Changes the currentWord key of the Word object in an array to true (and the previous one to false) given an index
const setNextWord = (wordList) => {
	const currentIndex = wordList.findIndex((element) => element.isCurrentWord);


	// Set the current word to false, and if there are still words left after it, set the next one to true
	wordList[currentIndex].isCurrentWord = false;
	if (currentIndex < wordList.length-1) {
		wordList[currentIndex + 1].isCurrentWord = true;
	}
	return wordList;
};

export default setNextWord;
