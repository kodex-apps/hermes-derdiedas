import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./match.css";
import TextBox from "../components/match.textbox";
import setNextWord from "../utils/setnextword";
import dataService from "../utils/dataservice.js";

/*
 * A match will be a text box with words showing on its right side. You have to write the articles to the words that appear. As you write them, the cursor stays in the same spot and the text keeps getting pushed to the right, disappearing. Once you write the correct article, it'll light up green and the word will scroll up and fade away, as a new word will fade in and scroll from the bottom into the slot, repeating the process. This means: If you get the article wrong, it'll glow red, and that word will not count towards your end score.
 */

const validArticles = ["der", "die", "das"];

const Match = (props) => {
	// Get the player's match and id array in case the playerObject gets lost on the way (format is matchId-playerId)
	const lsPlayerIdArray = (localStorage.getItem('playerIdArray') || '0-0').split('-');
	// Get the matchId from the URL
	const {matchId} = useParams();
	// Load a placeholder wordList for now (wordList is always an array)
	const [wordList, setWordList] = useState(["Lade..."]);
	// Load in the state variable
	const { state } = useLocation();
	// Assign the state variable to the playerObject variable
	const [playerObject, setPlayerObject] = useState(state ? state.playerObject : null);
	// Set the currentWord variable, the backend already sets isCurrentWord for the first word in the list
	let currentWord = wordList.find((e) => e.isCurrentWord);
	// Initialise the variable for the text input
	const articleInputRef = useRef(null);
	// Initialise the variable for the floating text when you get a correct word
	const animatedText = useRef(null);
	// Navigate variable is for sending the user through different routes programmatically
	const navigate = useNavigate();
	// Initialise the variable for the span element containing the word
	const wordSpan = useRef(null);

	useEffect(() => {
		let done = false;
		if (!done) {
			dataService.get(matchId)
				.then((response) => response.json())
				.then((response) => {
					setWordList(response.wordList);
					// If we have no playerObject and no localStorage of the player, send them to the lobby
					// if the playerObject is valid use that, if not retreive the playerObject through the localStorage
					if (!playerObject && lsPlayerIdArray[0] !== matchId) {
						navigate(`/${matchId}`);
					} else if (!playerObject && (lsPlayerIdArray[0] === matchId)) {
						// Created a temp variable to use that isn't really necessary but cba to change it
						const newPlayerObject = response.playerList.find(e => e.id === Number(lsPlayerIdArray[1])) 
						setPlayerObject(newPlayerObject);
						let updatedWordList = response.wordList;
						updatedWordList.find(e => e.isCurrentWord).isCurrentWord = false;
						// Use the completedWords as index for the currentWord unless it's 10 (which means we done)
						if (newPlayerObject.wordsCompleted < 10) {
							updatedWordList[newPlayerObject.wordsCompleted].isCurrentWord = true;
							setWordList(updatedWordList);
						}
						checkWordsCompleted();
					}
				});
		}
		return () => { done = true; }
	},[]);

	// Function to check the wordsCompleted and send them to lobby if they're done
	const checkWordsCompleted = () => {
		// If user has completed 10 words (or more, just in case), end the match and send them to lobby
		if (playerObject.wordsCompleted >= 10) {
			playerObject.hasPlayed = true;
			localStorage.setItem('playerName', playerObject.name);
			dataService.update(playerObject, matchId)
				.then(() => navigate(`/${matchId}`, { state: { playerObject: playerObject } }))
				.catch(e => console.log(e.message));
		}

	}

	/* TODO: useEffect to control the width of font size of the current word (wordSpan)
	useEffect(() => {
		if (wordSpan.current) console.log("wordSpan width: " + wordSpan.current);
	}, [wordSpan.current]);*/

	/*
	 * Function that will check if the last 3 characters of TextBox match with the article of the current word:
	 * 1. If it's equivalent, do an animation where the article + the word scroll up and fade out.
	 * 2. Set the wordList to be the next one (there's a util for that)
	 */
	const handleChange = (event) => {
		const input = event.target.value.slice(-3).toLowerCase();
		wordSpan.current.classList.remove("shake-class");
		// Check if user wrote a valid article
		if (validArticles.includes(input)) {
			// Get the last three characters of user input (der, die, das are always three) and check if they are the article belonging to the current word
			if (currentWord.article.includes(input)) {
				// If the playerobject is falsey (for example it doesn't exist because they refresh the match page), send them to the lobby
				if (!playerObject) navigate(`/${matchId}`);
				// Increase the score by 1 if the word wasn't input incorrectly before
				if (currentWord.isCorrectWord === null) playerObject.score++;
				// Set the current word into the fadeout element before it changes value
				animatedText.current.innerHTML = currentWord.article.replace(currentWord.article.charAt(0), currentWord.article.charAt(0).toUpperCase()) + " " + currentWord.word;
				// Update the state variable wordList with the setNextWord util function. Notice we pass a new array, through destructuring, as a function or else it wouldn't re-render thinking it's the same array
				setWordList([...setNextWord(wordList)]);
				currentWord = wordList.find((e) => e.isCurrentWord);
				// Empty the text input element
				articleInputRef.current.value = "";
				// Apply the fadeout animation
				animatedText.current.classList.add("fadeout-class");
				// Add one to the wordsCompleted number
				playerObject.wordsCompleted++;
				// We log the current playerObject for debugging purposes
				console.log(`Player ${playerObject.name} with wordsCompleted ${playerObject.wordsCompleted}, score ${playerObject.score}, hasPlayed ${playerObject.hasPlayed}`);
				dataService.update(playerObject, matchId)
					.then((response) => response.json())
					.then((response) => {
						// we log the response playerObject to see what we set in the server
						const rplayerObject = response.playerList.find(e => e.id === Number(playerObject.id));
						console.log(`Player ${rplayerObject.name} with wordsCompleted ${rplayerObject.wordsCompleted}, score ${rplayerObject.score}, hasPlayed ${rplayerObject.hasPlayed}`);
					});
				checkWordsCompleted();
			} else {
				// Set the isCorrectWord = false if the user got it wrong once
				wordList[wordList.findIndex((e) => e.isCurrentWord)].isCorrectWord = false;
				// Empty the text input element
				articleInputRef.current.value = "";
				wordSpan.current.classList.add("shake-class");
			}
		} else {
			animatedText.current.classList.remove("fadeout-class");
			animatedText.current.innerHTML = "";
		}
	};

	const handleMatchClick = () => {
		if (articleInputRef.current) articleInputRef.current.focus();
	}

	return <div onClick={handleMatchClick} className="match">
			{(playerObject && ((wordList.some(e => e.isCurrentWord) === true) && (playerObject.wordsCompleted < 10))) ? 
			(<div>
				<div><TextBox articleInputRef={articleInputRef} onChange={handleChange} />
				<div ref={animatedText} className="animated-text"/></div>
				<span ref={wordSpan} className="word-span">{wordList.find((e) => e.isCurrentWord).word}</span>
			</div>) : 
			(<p className="game-ended">Lade Punktestand...</p>)}
		</div>
};

export default Match;
