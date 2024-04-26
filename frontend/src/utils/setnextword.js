// Changes the currentWord key of the Word object in an array to true (and the previous one to false) given an index
const setNextWord = (wordList) => {
	const currentIndex = wordList.findIndex((element) => element.isCurrentWord);
	if (currentIndex < wordList.length-1) {
		wordList[currentIndex].isCurrentWord = false;
		wordList[currentIndex + 1].isCurrentWord = true;
	}
	return wordList;
};

export default setNextWord;
