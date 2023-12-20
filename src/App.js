import { useState } from 'react';
import Marking from './Screens/Marking';
import Project from './Screens/Project';
import useLocalStorageState from 'use-local-storage-state';

function App() {
	const [ appState, setAppState ] = useLocalStorageState('appState', { defaultValue: [] });
	const [ matchState, setMatchState ] = useState({});

	const handleProjectSave = matchData => {
		const allWithoutCurrent = appState.filter(p => {
			return p.ytUrl !== matchData.ytUrl;
		});
		const newAppState = allWithoutCurrent.concat(matchData);
		setAppState(newAppState);
		setMatchState(matchData);
	};

	if (matchState.hasOwnProperty('ytUrl')) {
		return <Marking matchState={ matchState } setMatchState={ setMatchState } />;
	} else {
		return <Project appState={ appState } handleProjectSave={ handleProjectSave } />;
	}
}

export default App;
