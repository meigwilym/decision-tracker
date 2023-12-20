import { useState } from 'react';
import { secondsToTimeFormat } from './Duration';
import decisionOptions from '../decisionOptions';

function CodeRadio({ label, value, colour, selected }) {
	return (
		<div className="inline mx-1" key={`code_${ value }`}>
			<input type="radio" id={`code_${ value }`} name="code" value={value} selected={ value === selected ? true : false } className="hidden peer" required />
			<label htmlFor={`code_${ value }`}
				className={`peer-checked:border-${ colour }-600 peer-checked:text-${ colour }-600 hover:text-gray-600 hover:bg-gray-100 inline-flex items-center justify-between p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer` }>
				<div className="block">
					<div className="w-full">{ label }</div>
				</div>
			</label>
		</div>
	);
}

function Form({ handleOnSave, timestamp, started }) {

	const defaultFormState = {
		timestamp: 0,
		code: 'good',
		decision: '',
		comments: ''
	};

	console.log('Form.started', started);

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
		<form onSubmit={ onSubmit }>
			<div className="flex">
				<div className="flex-inline mb-5">
					<label htmlFor="timestamp">Timestamp</label>
					<input readOnly type="text" value={ secondsToTimeFormat(formState.timestamp) } required />
					<input type="hidden" name="timestamp" value={ formState.timestamp } />
				</div>

				<fieldset>
					<label>Code</label>
					{ decisionOptions.map(option => <CodeRadio key={ option.value } selected={ formState.code } value={ option.value } label={ option.label } colour={ option.colour } />) }
				</fieldset>
			</div>

			<div className="flex-block mb-5">
				<label htmlFor="decision">Decision</label>
				<input type="text" name="decision" id="decision" required />
			</div>

			<div className="flex-block mb-5">
				<label htmlFor="comments">Comments</label>
				<textarea name="comments" id="comments" />
			</div>

			<div>
				<button onClick={ onMark } type="button" id="mark" disabled={ !started }>Mark</button>
				<button type="submit" name="save" id="save" disabled={ !started && !isMarked }>Save</button>
			</div>
		</form>
	);
}

export default Form;
