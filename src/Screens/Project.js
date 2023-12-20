
function Project({ appState, handleProjectSave }) {

	const now = new Date();

	const createMatchObject = data => {
		if (typeof data.matchDate === 'string') {
			data.matchDate = new Date(data.matchDate);
		}
		if (!data.hasOwnProperty('decisions')) {
			data.decisions = [];
		}
		if (!data.hasOwnProperty('kickOff')) {
			data.kickOff = 0;
		}
		if (!data.hasOwnProperty('secondHalfKo')) {
			data.secondHalfKo = 0;
		}
		return data;
	};

	const onProjectSave = event => {
		event.preventDefault();

		const matchObject = createMatchObject({
			title: event.target['title'].value,
			ytUrl: event.target['ytUrl'].value,
			matchDate: event.target['matchDate'].value,
		});
		handleProjectSave(matchObject);
	};

	const onMatchClick = ev => {
		handleProjectSave(createMatchObject(JSON.parse(ev.target.dataset.match)));
	};

	return (
		<div className="flex">
			<div className="w-1/2">
				{ appState.length === 0 ? <div></div> : appState.map(match => {
					return (
						<div key={ match.ytUrl } data-match={ JSON.stringify(match) } onClick={ onMatchClick }>
							{ match.title } - { match.matchDate.toLocaleString('en-gb', { weekday:"long", year:"numeric", month:"short", day:"numeric" }).split('T')[0] }
						</div>
					);
				}) }
			</div>
			<div className="w-1/2">
				<form onSubmit={ onProjectSave }>
					<div>
						<label htmlFor="title">Match Title</label>
						<input type="text" name="title" id="title" required  />
					</div>
					<div className="flex-inline mb-5">
						<label htmlFor="ytUrl">YouTube URL</label>
						<input type="text" name="ytUrl" id="ytUrl" required  />
					</div>
					<div className="flex-inline mb-5">
						<label htmlFor="matchDate">Match Date</label>
						<input type="date" name="matchDate" id="matchDate" max={ now.toISOString().split('T')[0] } required  />
					</div>
					<div>
						<button type="submit">Start!</button>
					</div>
				</form>
			</div>

		</div>
	);

}

export default Project;
