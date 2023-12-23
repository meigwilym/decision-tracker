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
		<td>
			<button type="button" className="link" onClick={ jump } title={`Jump to ${secondsToTimeFormat(decision.timestamp)}`}>
				<Duration seconds={ decision.timestamp } />
			</button>
		</td>
		<td>
			<Duration seconds={ matchTime } />
		</td>
		<td>
			{ selectedDecision.label }
		</td>
		<td>
			{ decision.decision }
		</td>
		<td>
			{ decision.comments }
		</td>
	</tr>);
}

export default DecisionRow;
