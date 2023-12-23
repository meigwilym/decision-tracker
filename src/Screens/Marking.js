import { useState } from 'react';
import { useRef } from 'react';
import ReactPlayer from 'react-player';
import Form from '../Components/Form';
import DecisionList from '../Components/DecisionList';
import Aside from '../Components/Aside';
import ListToggle from '../Components/ListToggle';
import MarkTime from '../Components/MarkTime';
// import CsvDownloadButton from 'react-json-to-csv';

function Marking({ matchState, setMatchState }) {

	const playerRef = useRef(null);

	const [ timestamp, setTimestamp ] = useState(0);
	const [ started, setStarted ] = useState(false);
	const [ codeFilters, setCodeFilters ] = useState([]);

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
		setMatchState({ ...matchState, kickOff: timestamp});
	};
	const handleSetSecondHalfKoTime = () => setMatchState({ ...matchState, secondHalfKo: timestamp});

	const newMatch = () => setMatchState({});

	return (

		<div className="flex">

			<Aside>
				<div className="mt-4">
					<label className="mb-1">Kick Off Time</label>
					<MarkTime seconds={ matchState.kickOff } handleClick={ handleSetKickOffTime } />
				</div>
				<div className="mt-4">
					<label className="mb-1">Second Half KO Time</label>
					<MarkTime seconds={ matchState.secondHalfKo } handleClick={ handleSetSecondHalfKoTime } />
				</div>


			</Aside>

			<div className="w-full flex flex-col h-screen overflow-y-hidden px-2">

				<header className="w-full py-2 flex">
					<div class="flex-1">
						<h2 className="text-2xl font-bold">{ matchState.title }</h2>
						<h3 className="text-l">{ matchState.matchDate.toLocaleString('en-gb', { weekday:"long", year:"numeric", month:"short", day:"numeric" }) }</h3>
					</div>
					<div class="flex-none">
						<button type="button" className="btn btn-accent btn-sm" onClick={ newMatch }>New Match</button>
					</div>
				</header>

				<div className="w-full border-t ">
					<div className="flex flex-row">
						<div id="react-player">
							<ReactPlayer
								ref={playerRef}
								url={matchState.ytUrl}
								controls={true}
								onProgress={ handleProgress }
								onStart={ () => setStarted(true) }
							/>
						</div>
						<div className="w-full mx-2">
							<Form handleOnSave={ handleOnSave } timestamp={ timestamp } started={ started } />
						</div>
					</div>

				</div>
				<div className="overflow-x-hidden">
					<DecisionList matchState={ matchState } handleJumpToTimestamp={ handleJumpToTimestamp } codeFilters={ codeFilters } />
				</div>
			</div>
		</div>
	);
}

export default Marking;
