import { useEffect, useState } from 'react';
import Marking from './Screens/Marking';
import Project from './Screens/Project';
import useLocalStorageState from 'use-local-storage-state';

function App() {
	// fetch the state from local storage
	const [ appState, setAppState ] = useLocalStorageState('appState', { defaultValue: [] });
	const [ matchState, setMatchState ] = useState({});

	const handleProjectSave = matchData1 => {
		const matchData = createMatchObject(matchData1);
		const mergedState = appState.filter(p => {
			return p.ytUrl !== matchData.ytUrl;
		}).concat(matchData);
		setAppState(mergedState);
		setMatchState(matchData);
	};

	const loadMatchFromYtUrl = ytUrl => {
		const selectedMatch = appState.filter(match => match.ytUrl === ytUrl).pop();
		setMatchState(createMatchObject(selectedMatch));
	};

	const createMatchObject = data => {
		if (typeof data.matchDate === 'string') {
			data.matchDate = new Date(data.matchDate);
		}
		if (!data.hasOwnProperty('decisions')) {
			data.decisions = [];
		}
		if (!data.hasOwnProperty('kickOff')) {
			data.kickOff = 0;
		}
		if (!data.hasOwnProperty('secondHalfKo')) {
			data.secondHalfKo = 0;
		}
		return data;
	};

	useEffect(() => {
		if (!matchState.hasOwnProperty('ytUrl')) {
			return;
		}
		const mergedState = appState.filter(p => {
			return p.ytUrl !== matchState.ytUrl;
		}).concat(matchState);
		setAppState(mergedState);
	}, [matchState, appState, setAppState]);

	if (matchState.hasOwnProperty('ytUrl')) {
		return <Marking matchState={ matchState } setMatchState={ setMatchState } />;
	} else {
		return <Project appState={ appState } handleProjectSave={ handleProjectSave } loadMatch={ loadMatchFromYtUrl } />;
	}
}

export default App;
