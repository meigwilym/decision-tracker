import DecisionRow from './DecisionRow';

function DecisionList ({ matchState, handleJumpToTimestamp, codeFilters }) {

	let decisionList = [...matchState.decisions];

	// add kick off and second half kick off
	if (matchState.kickOff > 0) {
		decisionList.push({
			timestamp: matchState.kickOff,
			code: 'event',
			decision: 'Match Start',
			comments: ''
		});
	}
	if (matchState.secondHalfKo > 0) {
		decisionList.push({
			timestamp: matchState.secondHalfKo,
			code: 'event',
			decision: 'Second Half Start',
			comments: ''
		});
	}
	// sort again
	decisionList = decisionList.sort((a, b) => a.timestamp - b.timestamp).reverse();;
	if (codeFilters.length > 0) {
		decisionList = decisionList.filter(dec => codeFilters.includes(dec.code) )
	}

	return matchState.decisions.length === 0 ? (<div></div>) : (
		<table className="table">
			<thead className="">
				<tr>
					<th className="w-8">Video Time</th>
					<th className="w-8">Match Time</th>
					<th className="w-8">Code</th>
					<th className="w-64">Decision</th>
					<th>Comments</th>
				</tr>
			</thead>
			<tbody>
				{ decisionList.map(decision => <DecisionRow decision={ decision } kickOff={ matchState.kickOff } secondHalfKo={ matchState.secondHalfKo }  key={ decision.timestamp } handleJumpToTimestamp={ handleJumpToTimestamp } />) }
			</tbody>
		</table>
	);
}

export default DecisionList;
