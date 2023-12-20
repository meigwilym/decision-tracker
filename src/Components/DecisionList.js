import DecisionRow from './DecisionRow';

function DecisionList ({ matchState, handleJumpToTimestamp }) {

	return matchState.decisions.length === 0 ? (<div></div>) : (
		<table className="border-collapse w-full border border-slate-400 bg-white text-sm shadow-sm">
			<thead className="bg-slate-50">
				<tr>
					<th className="w-8">Video Time</th>
					<th className="w-8">Match Time</th>
					<th className="w-8">Code</th>
					<th className="w-64">Decision</th>
					<th>Comments</th>
				</tr>
			</thead>
			<tbody>
				{ [...matchState.decisions].reverse().map(decision => <DecisionRow decision={ decision } kickOff={ matchState.kickOff } secondHalfKo={ matchState.secondHalfKo }  key={ decision.timestamp } handleJumpToTimestamp={ handleJumpToTimestamp } />) }
			</tbody>
		</table>
	);
}

export default DecisionList;
