import React from 'react';

/*
 * A match will be a text box with words showing on its right side. You have to write the articles to the words that appear. As you write them, the cursor stays in the same spot and the text keeps getting pushed to the right, disappearing. Once you write the correct article, it'll light up green and the word will scroll up and fade away, as a new word will fade in and scroll from the bottom into the slot, repeating the process. This means: If you get the article wrong, it'll glow red, and that word will not count towards your end score.
 */

// TODO: Create some sort of word list component where the words will scroll up (and fade-in/fade-out). I'm thinking maybe a state variable that will hold a list of items and set a css animation of fade-in/fade-out to a different word every time a user guesses a word correctly. This should be enough at least for the word part (not the article part)
// TODO: Now do the article part

// Placeholder list of 10 words with their articles
const loadedWordList = [{article: 'Das', word: 'Haus', isCurrentWord: true},{article: 'Die', word: 'Frau', isCurrentWord: true}, {article: 'Der', word: 'Mann', isCurrentWord: true}, {article: 'Das', word: 'Interesse', isCurrentWord: true}, {article: 'Der', word: 'Meister', isCurrentWord: true}, {article: 'Die', word: 'Bremse', isCurrentWord: true}, {article: 'Der', word: 'Junge', isCurrentWord: true}, {article: 'Das', word: 'Kind', isCurrentWord: true}, {article: 'Die', word: 'Mermelade', isCurrentWord: true}, {article: 'Das', word: 'Ziel', isCurrentWord: true}];

const Match = props => {
	[wordList, setWordList] = useState(loadedWordList);
	return <div className="match">
	
	</div>
}

export default Match;
