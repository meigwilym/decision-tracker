import { secondsToTimeFormat } from "./Duration";

function MarkTime({ seconds, handleClick, label = 'Mark' }) {

	return (
		<div className="join">
			<button type="button" onClick={ handleClick } className="btn btn-primary join-item btn-sm rounded-r-full">{ label } </button>
			<input type="text" readOnly value={ secondsToTimeFormat(seconds) } className="input input-bordered input-sm join-item" />
		</div>
	);
}

export default MarkTime;
