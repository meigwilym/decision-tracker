function Aside({ children }) {
	return (
		<aside className="bg-accent">
			<div className="p-4">
				<a href="index.html" className="leading-4 text-3xl font-semibold uppercase hover:text-gray-300">Decision Tracker</a>

				<hr />

				{ children }

				<hr />
			</div>
		</aside>
	)
}

export default Aside;
