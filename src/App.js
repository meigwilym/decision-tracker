import { useEffect, useState } from 'react';
import Marking from './Screens/Marking';
import Project from './Screens/Project';
import useLocalStorageState from 'use-local-storage-state';

function App() {
	const [ appState, setAppState ] = useLocalStorageState('appState', { defaultValue: [] });
	const [ matchState, setMatchState ] = useState({});

	const handleProjectSave = matchData => {
		const mergedState = appState.filter(p => {
			return p.ytUrl !== matchData.ytUrl;
		}).concat(matchData);
		setAppState(mergedState);
		setMatchState(matchData);
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
		return <Project appState={ appState } handleProjectSave={ handleProjectSave } />;
	}
}

export default App;
