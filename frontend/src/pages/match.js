import React, { useState } from 'react';
import './match.css';
import TextBox from '../components/match.textbox';

/*
 * A match will be a text box with words showing on its right side. You have to write the articles to the words that appear. As you write them, the cursor stays in the same spot and the text keeps getting pushed to the right, disappearing. Once you write the correct article, it'll light up green and the word will scroll up and fade away, as a new word will fade in and scroll from the bottom into the slot, repeating the process. This means: If you get the article wrong, it'll glow red, and that word will not count towards your end score.
 */

// TODO: Do the article part.
// TODO: Create some sort of word list component where the words will scroll up (and fade-in/fade-out). I'm thinking maybe a state variable that will hold a list of items and set a css animation of fade-in/fade-out to a different word every time a user guesses a word correctly. This should be enough at least for the word part (not the article part). A util function was created to set to updated the setCurrentWord status according to the index

// Placeholder list of 10 words with their articles
const loadedWordList = [{article: 'Das', word: 'Haus', isCurrentWord: true},{article: 'Die', word: 'Frau', isCurrentWord: false}, {article: 'Der', word: 'Mann', isCurrentWord: false}, {article: 'Das', word: 'Interesse', isCurrentWord: false}, {article: 'Der', word: 'Meister', isCurrentWord: false}, {article: 'Die', word: 'Bremse', isCurrentWord: false}, {article: 'Der', word: 'Junge', isCurrentWord: false}, {article: 'Das', word: 'Kind', isCurrentWord: false}, {article: 'Die', word: 'Mermelade', isCurrentWord: false}, {article: 'Das', word: 'Ziel', isCurrentWord: false}];

const Match = props => {
	const [wordList, setWordList] = useState(loadedWordList);
	return <div className="match">
		<TextBox />
	</div>
}

export default Match;
