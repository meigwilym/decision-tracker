import { useState } from 'react';
import decisionOptions from '../decisionOptions';
import MarkTime from './MarkTime';
import RadioButton from './RadioButton';

function Form({ handleOnSave, timestamp, started }) {

	const defaultFormState = {
		timestamp: 0,
		code: 'good',
		decision: '',
		comments: ''
	};

	// the time must be freshly marked
	const [ isMarked, setIsMarked ] = useState(false);
	const [ formState, setFormState ] = useState(defaultFormState);

	const onSubmit = (event) => {
		event.preventDefault();
		if (!isMarked) {
			return false;
		}
		setIsMarked(false);

		const formData = {
			timestamp: parseInt(event.target['timestamp'].value),
			code: event.target['code'].value,
			decision: event.target['decision'].value,
			comments: event.target['comments'].value
		};
		handleOnSave(formData);

		// reset the form
		event.target['code'].value = 'good';
		event.target['decision'].value = '';
		event.target['comments'].value = '';
	}

	const onMark = ev => {
		setIsMarked(true);
		setFormState({ ...formState, timestamp: parseInt(timestamp) });
	};

	return (
		<form className="mt-2" onSubmit={ onSubmit }>
			<div className="form-control">
				<label htmlFor="timestamp">Video Time</label>
				<MarkTime seconds={ formState.timestamp } handleClick={ onMark } />
				<p className="form-help">Mark the decision's timecode from the video</p>
				<input type="hidden" name="timestamp" value={ formState.timestamp } />
			</div>

			<div>
				<fieldset>
					<label className="block">Code</label>
					<ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
					{ decisionOptions.map(option => <li><RadioButton key={ option.value } selected={ formState.code } value={ option.value } label={ option.label } /></li>) }
					</ul>
				</fieldset>
			</div>

			<div className="form-control">
				<label htmlFor="decision" className="label">Decision</label>
				<input type="text" name="decision" id="decision" className="input input-sm input-bordered input-primary w-full" required />
				<p className="form-help">Mark the decision and offence, e.g. "Penalty advantage: offside"</p>
			</div>

			<div className="grid grid-cols-8 gap-4">

				<div className="col-span-6 ">
					<div className="form-control">
						<label htmlFor="comments" className="label">Comments</label>
						<p className="form-help">Any comments for your coach or assesor</p>
						<textarea name="comments" id="comments" className="textarea textarea-sm textarea-bordered w-full" />

					</div>
				</div>
				<div className="col-span-2 ">
					<div className="form-control content-end">
						<button className="btn btn-primary" type="submit" name="save" id="save" disabled={ !started && !isMarked }>Save</button>
					</div>
				</div>

			</div>




		</form>
	);
}

export default Form;
