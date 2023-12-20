
import ReactPlayer from 'react-player';

// Render a YouTube video player
function Player({ handleDuration, handlePlay, handlePause }) {

	const play = (ev) => {
		console.log('Player.play', ev);
		handlePlay()
	}
	const pause = (ev) => {
		console.log('Player.pause', ev);
		handlePause()
	}

    return (
		<ReactPlayer
			url='https://www.youtube.com/watch?v=13K9oBsudKY'
			controls={true}
			onReady={(ev) => console.log('onReady', ev)}
            onStart={(ev) => console.log('onStart', ev)}
			onPlay={ play() }
			onPause={ pause() }
			onDuration={ handleDuration }
		/>
	);
}
export default Player;
