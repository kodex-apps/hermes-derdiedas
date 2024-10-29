import {React, useEffect} from 'react';
//import getMatch from '../utils/getnewmatch';
import DataService from '../utils/dataservice.js';
import {useNavigate} from 'react-router-dom';


const PreLobby = () => {
	const navigate = useNavigate();
	// TODO: Create a match on load [...]
	// If there is no match being passed to Lobby, create a new one
	// TODO: Fetch the created match's playerList and assign it to fetchedPlayerList
	useEffect(() => {
		const handleLoad = () => {
			DataService.post()
				.then((response) => response.json())
				.then((response) => {
					navigate(`/${response._id}`);
				});
		}
		window.addEventListener('load', handleLoad);
		//commenting out for debugging purposes
		//return () => window.removeEventListener('load', handleLoad);
	},[]);

	return <h1>Laden...</h1>;
}

export default PreLobby;
