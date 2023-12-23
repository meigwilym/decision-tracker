import decisionOptions from "../decisionOptions";

function ListToggle({ codeFilters, setCodeFilters }) {

	const toggleDecisionOption = ev => {
		const value = ev.target.value;
		const isChecked = ev.target.checked;

		if (isChecked && !codeFilters.includes(value)) {
			codeFilters.push(value)
		}
		if (!isChecked && codeFilters.includes(value)) {
			codeFilters = codeFilters.filter(val => val !== value);
		}
		console.log(codeFilters)
		setCodeFilters(codeFilters);
	};

	return (
		<div className="">
			<label className="">Toggle Decisions</label>

			{ decisionOptions.map(decOpt => {
				return (
					<div class="form-control">
						<label class="label cursor-pointer justify-start" htmlFor={ `decision_${decOpt.value}`} >
							<input type="checkbox" className="toggle toggle-primary" onChange={ toggleDecisionOption } name={ `decision_${decOpt.value}`} value={ decOpt.value } id={ `decision_${decOpt.value}`} />
							<span class="label-text pl-1">{ decOpt.label }</span>
						</label>
					</div>
				);
			}) }
			<p className="form-help">Toggle the decisions in the list by their codes</p>
		</div>
	);
}

export default ListToggle;
