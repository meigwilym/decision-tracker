
function Project({ appState, handleProjectSave, loadMatch }) {

	const now = new Date();

	const onProjectSave = event => {
		event.preventDefault();

		const youtubeUrlRegex = /https:\/\/(www.|m.)?youtu(\.)?be(\.com)?\/(watch\?v=|v\/)?(?<youtubeId>[\w]{11})/;

		handleProjectSave({
			title: event.target['title'].value,
			ytUrl: event.target['ytUrl'].value,
			youtubeId: event.target['ytUrl'].value.match(youtubeUrlRegex).groups.youtubeId,
			matchDate: event.target['matchDate'].value,
			decisions: []
		});
	};

	const onMatchClick = ev => {
		loadMatch(JSON.parse(ev.currentTarget.dataset.matchYtUrl));
	};

	return (
		<div className="container mx-auto">

			<div className="hero bg-base-200 p-32" style={{ "backgroundImage": "url('/img/hero-ref.jpg')", "backgroundPosition": "top" }}>
				<div className="hero-content text-center glass">
					<div className="max-w-md">
						<h1 className="text-5xl text-white font-bold">Decision Tracker</h1>
						<p className="py-4 text-white">A tool for referees to improve their decision making.</p>
						<a className="btn btn-primary" href="#tracking-form">Get Started</a>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-6 my-16">

				<div className="card w-96 bg-base-100 shadow-xl mr-6">
					<figure class="px-10 pt-10">
						<img src="/img/box1.png" className="border border-gray-300" alt="A screenshot detailing a youtube video" />
					</figure>
					<div className="card-body">
						<h2 className="card-title">Watch a Video</h2>
						<p>Use a Youtube video to track your performance.</p>
					</div>
				</div>

				<div className="card w-96 bg-base-100 shadow-xl mx-6">
					<figure class="px-10 pt-10">
						<img src="/img/box2.png" className="border border-gray-300" alt="A screenshot detailing the decision list" />
					</figure>
					<div className="card-body">
						<h2 className="card-title">Track Decisions</h2>
						<p>Track all your decisions using the simple form.</p>
					</div>
				</div>

				<div className="card w-96 bg-base-100 shadow-xl ml-6">
					<figure className="px-10 pt-10">
						<img src="/img/box3.png" className="border border-gray-300" alt="A screenshot detailing the decision form" />
					</figure>
					<div className="card-body">
						<h2 className="card-title">Mark Discussion Points</h2>
						<p>Missed anything? Questions for an expert? Mark them down here.</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-6 gap-4">

				<div className="col-start-2 col-span-2 float-right prose">
					<h2 className="heading-2">Start a tracking session</h2>
					<form onSubmit={ onProjectSave } id="tracking-form">
						<div>
							<label htmlFor="title" className="label">
								<span className="text-base label-text">Match Title</span>
							</label>
							<input type="text" name="title" id="title" placeholder="Home v Away" className="input input-primary w-full" required  />
							<p className="mt-2 text-sm text-gray-600">Give your match a title</p>
						</div>
						<div className="">
							<label htmlFor="ytUrl" className="label">
								<span className="text-base label-text">YouTube URL</span>
							</label>
							<input type="text" name="ytUrl" id="ytUrl" placeholder="http://youtube.com/watch?v=12345" className="input input-primary w-full " required  />
							<p className="mt-2 text-sm text-gray-600">The full URL of the YouTube video.</p>
						</div>
						<div className="">
							<label htmlFor="matchDate" className="label">
								<span className="text-base label-text">Match Date</span>
							</label>
							<input type="date" name="matchDate" id="matchDate" max={ now.toISOString().split('T')[0] } className="input input-primary w-full " required  />
							<p className="mt-2 text-sm text-gray-600">When was the match played?</p>
						</div>
						<div>
							<button type="submit" className="btn btn-primary mt-2">Start Tracking!</button>
						</div>
					</form>
				</div>

				<div className="col-span-2">
					<div className="prose">
						<h2 className="heading-2">Existing Tracked Games</h2>
					</div>

					{ appState.length === 0 ? null
					:
					appState.map(match => ({...match, matchDate: new Date(match.matchDate)}))
						.map(match => {
							return (
								<div key={ match.ytUrl } className="card bg-base-100 shadow-xl ">
									<div className="card-body">
										<h2 className="card-title">{ match.title }</h2>
										<div className="grid grid-cols-4">
											<div className="col-span-3">
												<p>{ match.matchDate.toLocaleString('en-gb', { weekday:"long", year:"numeric", month:"short", day:"numeric" }).split('T')[0] }</p>
											</div>
											<div className="">
												<div class="indicator">
													<span class="indicator-item badge badge-success" title={ `${match.decisions.length} decisions tracked` }>{match.decisions.length}</span>
													<button type="button" className="btn btn-secondary" data-match-yt-url={ JSON.stringify(match.ytUrl) } onClick={ onMatchClick } title={ `${match.decisions.length} decisions tracked` }>View</button>
												</div>
											</div>
										</div>


									</div>
								</div>
							);
						}) }
				</div>

			</div>

			<footer className="footer p-10 bg-neutral text-neutral-content mt-6">
				<nav>
					<header className="footer-title">Decision Tracker</header>
					<a className="link link-hover" href="/">About</a>
					<a className="link link-hover" href="/">Help</a>
				</nav>
			</footer>

		</div>
	);
}

export default Project;
