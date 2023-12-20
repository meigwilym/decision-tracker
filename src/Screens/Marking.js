import { useState } from 'react';
import { useRef } from 'react';
import ReactPlayer from 'react-player';
import Form from '../Components/Form';
import DecisionList from '../Components/DecisionList';
import { secondsToTimeFormat } from '../Components/Duration';
// import CsvDownloadButton from 'react-json-to-csv';

function Marking({ matchState, setMatchState }) {

	console.log('Marking matchState', matchState)

	const playerRef = useRef(null);

	const [ timestamp, setTimestamp ] = useState(0);
	const [ started, setStarted ] = useState(false);

	// save a record
	const handleOnSave = data => {
		const newDecisions = matchState.decisions.concat([data]).sort((a, b) => a.timestamp - b.timestamp);
		setMatchState({ ...matchState, decisions: newDecisions });
	};
	// set the timestamp as the video progresses
	const handleProgress = progress => setTimestamp(Math.round(progress.playedSeconds));

	// click on a time in the decision list to jump to that moment
	const handleJumpToTimestamp = seconds => playerRef.current.seekTo(seconds);

	const handleSetKickOffTime = () => {
		console.log('timestamp', timestamp, { ...matchState, kickOff: timestamp});
		setMatchState({ ...matchState, kickOff: timestamp});
	};
	const handleSetSecondHalfKoTime = () => setMatchState({ ...matchState, secondHalfKo: timestamp});

	return (
		<div>
			<header>
				<h1 className="text-3xl font-bold">Decision Tracker</h1>
				<div className="flex">
					<div className="w-1/2">
						<h2 className="text-2xl font-bold">{ matchState.title }</h2>
						<h3 className="text-xl">{ matchState.matchDate.toLocaleString('en-gb', { weekday:"long", year:"numeric", month:"short", day:"numeric" }) }</h3>
					</div>
					<div className="w-1/2">
						<div>
							<input type="text" readOnly value={ secondsToTimeFormat(matchState.kickOff) } className="rounded-none rounded-l-lg inline w-1/2" />
							<button type="button" onClick={ handleSetKickOffTime } className="rounded-r-lg">Kick Off Time</button>
						</div>
						<div>
							<input type="text" readOnly value={ secondsToTimeFormat(matchState.secondHalfKo) } className="rounded-none rounded-l-lg inline w-1/2" />
							<button type="button" onClick={ handleSetSecondHalfKoTime } className="rounded-r-lg">Second Half Time</button>
						</div>
					</div>
				</div>
			</header>

			<div className="flex">
				<div >
					<ReactPlayer
						ref={playerRef}
						url={matchState.ytUrl}
						controls={true}
						onProgress={ handleProgress }
						onStart={() => { setStarted(true);console.log('on start', started); } }
					/>
				</div>
				<div className="ml-2">
					<Form handleOnSave={ handleOnSave } timestamp={ timestamp } started={ started } />
				</div>
			</div>

			<DecisionList matchState={ matchState } handleJumpToTimestamp={ handleJumpToTimestamp } />

		</div>
	);
}

export default Marking;
