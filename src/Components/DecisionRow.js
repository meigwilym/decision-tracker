import Duration, { secondsToTimeFormat } from './Duration';
import decisionOptions from '../decisionOptions';

function DecisionRow({ decision, kickOff, secondHalfKo, handleJumpToTimestamp }) {

	const selectedDecision = decisionOptions.filter(p => p.value === decision.code).pop();
	const decisionBackground = `bg-${selectedDecision.colour}-200`;

	const jump = () => {
		handleJumpToTimestamp(decision.timestamp);
		return false;
	};

	// Show the match time. Does not account for injury time
	let matchTime = 0;
	if (decision.timestamp > secondHalfKo) {
		matchTime = decision.timestamp - secondHalfKo + (40 * 60);
	} else {
		matchTime = decision.timestamp - kickOff;
	}

	return (<tr id={ decision.timestamp } className={ decisionBackground }>
		<td className="">
			<button type="button" onClick={ jump } title={`Jump to ${secondsToTimeFormat(decision.timestamp)}`}>
				<Duration seconds={ decision.timestamp } />
			</button>
		</td>
		<td className="border border-slate-300 font-semibold p-4 text-slate-900 text-left">
			<Duration seconds={ matchTime } />
		</td>
		<td className="border border-slate-300 font-semibold p-4 text-slate-900 text-left">
			{ selectedDecision.label }
		</td>
		<td className="border border-slate-300 font-semibold p-4 text-slate-900 text-left">
			{ decision.decision }
		</td>
		<td className="border border-slate-300 font-semibold p-4 text-slate-900 text-left">
			{ decision.comments }
		</td>
	</tr>);
}

export default DecisionRow;
