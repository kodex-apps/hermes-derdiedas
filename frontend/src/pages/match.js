import React from 'react';

/*
 * A match will be a text box with words showing on its right side. You have to write the articles to the words that appear. As you write them, the cursor stays in the same spot and the text keeps getting pushed to the right, disappearing. Once you write the correct article, it'll light up green and the word will scroll up and fade away, as a new word will fade in and scroll from the bottom into the slot, repeating the process. This means: If you get the article wrong, it'll glow red, and that word will not count towards your end score.
 */

// Placeholder list of 10 words with their articles
const wordList = [{article: 'Das', word: 'Haus'},{article: 'Die', word: 'Frau'}, {article: 'Der', word: 'Mann'}, {article: 'Das', word: 'Interesse'}, {article: 'Der', word: 'Meister'}, {article: 'Die', word: 'Bremse'}, {article: 'Der', word: 'Junge'}, {article: 'Das', word: 'Kind'}, {article: 'Die', word: 'Mermelade'}, {article: 'Das', word: 'Ziel'}];

const Match = props => {
	return <div className="match">
	
	</div>
}

export default Match;
