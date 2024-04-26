import React, { useState } from "react";
import "./match.css";
import TextBox from "../components/match.textbox";
import setNextWord from "../utils/setnextword";

/*
 * A match will be a text box with words showing on its right side. You have to write the articles to the words that appear. As you write them, the cursor stays in the same spot and the text keeps getting pushed to the right, disappearing. Once you write the correct article, it'll light up green and the word will scroll up and fade away, as a new word will fade in and scroll from the bottom into the slot, repeating the process. This means: If you get the article wrong, it'll glow red, and that word will not count towards your end score.
 */

// TODO: Do the article part.
// TODO: Create some sort of word list component where the words will scroll up (and fade-in/fade-out). I'm thinking maybe a state variable that will hold a list of items and set a css animation of fade-in/fade-out to a different word every time a user guesses a word correctly. This should be enough at least for the word part (not the article part). A util function was created to set to updated the setNextWord status according to the index

const validArticles = ["der", "die", "das"];
// Placeholder list of 10 words with their articles
const loadedWordList = [
	{ article: "das", word: "Haus", isCurrentWord: true, correctWord: null },
	{ article: "die", word: "Frau", isCurrentWord: false, correctWord: null },
	{ article: "der", word: "Mann", isCurrentWord: false, correctWord: null },
	{
		article: "das",
		word: "Interesse",
		isCurrentWord: false,
		correctWord: null,
	},
	{ article: "der", word: "Meister", isCurrentWord: false, correctWord: null },
	{ article: "die", word: "Bremse", isCurrentWord: false, correctWord: null },
	{ article: "der", word: "Junge", isCurrentWord: false, correctWord: null },
	{ article: "das", word: "Kind", isCurrentWord: false, correctWord: null },
	{
		article: "die",
		word: "Mermelade",
		isCurrentWord: false,
		correctWord: null,
	},
	{ article: "das", word: "Ziel", isCurrentWord: false, correctWord: null },
];

const Match = (props) => {
	const [wordList, setWordList] = useState(loadedWordList);
	let currentWord = wordList.find((e) => e.isCurrentWord);

	/*
	 * Function that will check if the last 3 characters of TextBox match with the article of the current word:
	 * 1. If it's equivalent, do an animation where the article + the word scroll up and fade out.
	 * 2. Set the wordList to be the next one (there's a util for that)
	 * 3. Make the new word come fade in from the bottom next to the textbox (where the last word was before guessing)
	 */
	const handleChange = (event) => {
		const input = event.target.value.slice(-3).toLowerCase();
		// Check if user wrote an article
		console.log(input);
		if (validArticles.includes(input)) {
			if (input.slice(-3) === currentWord.article) {
				// Set the correctWord = true if it wasn't marked as false before (because the user got it wrong)
				if (currentWord.correctWord === null)
					wordList[wordList.findIndex((e) => e.isCurrentWord)].correctWord =
						true;
				setWordList([...setNextWord(wordList)]);
				currentWord = wordList.find((e) => e.isCurrentWord);
				console.log(wordList);
			} else {
				// Set the correctWord = false if the user got it wrong once
				wordList[wordList.findIndex((e) => e.isCurrentWord)].correctWord =
					false;
			}
		}
	};

	return (
		<div className="match">
			<TextBox onChange={handleChange} />
			{wordList.find((e) => e.isCurrentWord).word}
		</div>
	);
};

export default Match;
