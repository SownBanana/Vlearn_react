import React, { useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import Player from "react-player";
import { Direction, FormattedTime } from "react-player-controls";
import { ProgressBar } from "./ProgressComponent";
import screenfull from "screenfull";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import { IconButton, useMediaQuery } from "@material-ui/core";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import VolumeDownRoundedIcon from "@material-ui/icons/VolumeDownRounded";
import VolumeMuteRoundedIcon from "@material-ui/icons/VolumeMuteRounded";
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded";
import AspectRatioRoundedIcon from "@material-ui/icons/AspectRatioRounded";
import FastRewindRoundedIcon from "@material-ui/icons/FastRewindRounded";
// const videoWrapper = ({ children }) => (
// 	<div
// 		className={
// 			screenfull.isFullscreen ? "video-wrapper fullscreen" : "video-wrapper"
// 		}
// 	>
// 		{children}
// 	</div>
// );
export default function VideoPlayer({ handlePrevious, handleNext, videoHeight = "360px", ...prop }) {
	const isMobile = useMediaQuery("(max-width: 760px)");
	const [showSpeed, setShowSpeed] = useState(false);

	const toggleShowSpeed = () => {
		setShowSpeed(!showSpeed);
	};

	const [slider, setSlider] = useState({
		intent: 0,
		hover: false,
	});

	const [video, setVideo] = useState({
		width: "100%",
		height: videoHeight,
		playing: false,
		controls: false,
		light: false,
		volume: 0.8,
		lastVolume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		loadedSeconds: 0,
		playedSeconds: 0,
		duration: 0,
		playbackRate: 1.0,
		seeking: false,
	});
	const player = useRef();
	const wholePlayer = useRef();
	const {
		width,
		height,
		playing,
		controls,
		light,
		volume,
		muted,
		loop,
		// played,
		// loaded,
		playbackRate,
		// seeking,
	} = video;

	// const load = (url) => {
	// 	setVideo({ ...video, url: url, played: 0, loaded: 0, pip: false });
	// };

	const handleVolumeChange = (e) => {
		setVideo({ ...video, volume: parseFloat(e.target.value) });
	};
	const handleToggleMuted = () => {
		if (video.muted) {
			setVideo({ ...video, muted: false, volume: video.lastVolume });
		} else {
			setVideo({
				...video,
				muted: true,
				lastVolume: video.volume === 0 ? 0.8 : video.volume,
				volume: 0,
			});
		}
	};
	const handleSetPlaybackRate = (value) => {
		setVideo({ ...video, playbackRate: value });
		toggleShowSpeed();
	};
	const handlePlay = () => {
		console.log("onPlay");
		setVideo({ ...video, playing: true });
	};
	const handlePause = () => {
		console.log("onPause");
		setVideo({ ...video, playing: false });
	};
	const handleEnded = () => {
		console.log("onEnded");
		setVideo({ ...video, playing: false });
	};
	const handleSeekStart = () => {
		setVideo({ ...video, seeking: true });
	};

	const handleSeekChange = (value) => {
		setVideo({ ...video, played: value });
	};

	const handleSeekEnd = (value) => {
		setVideo({ ...video, seeking: false });
		if (player.current) player.current.seekTo(value);
	};

	const handleProgress = (state) => {
		// console.log(player.current);
		if (!video.seeking) {
			console.log("onProgress", state);
			setVideo({
				...video,
				played: state.played,
				loaded: state.loaded,
				playedSeconds: state.playedSeconds,
				loadedSeconds: state.loadedSeconds,
			});
		}
	};
	const handleDuration = (duration) => {
		console.log("onDuration", duration);
		setVideo({ ...video, duration: duration });
	};

	const handleClickFullscreen = () => {
		if (screenfull.isFullscreen) {
			// console.log("Full");
			setVideo({ ...video, height: videoHeight });
		} else setVideo({ ...video, height: "100%" });
		screenfull.toggle(findDOMNode(wholePlayer.current));
	};
	var mouseMoveTimeOut = 0;
	const onMouseMoveInFullScreen = () => {
		if (wholePlayer.current && screenfull.isFullscreen) {
			clearTimeout(mouseMoveTimeOut);
			wholePlayer.current.classList.add("hover");
			mouseMoveTimeOut = setTimeout(() => {
				wholePlayer.current.classList.remove("hover");
			}, 3000);
		}
	};
	useEffect(() => {
		if (screenfull.isFullscreen) {
			console.log("Them su kien");
			wholePlayer.current.classList.remove("normal");
			wholePlayer.current.addEventListener(
				"mousemove",
				onMouseMoveInFullScreen
			);
		} else {
			console.log("Bo su kien");
			wholePlayer.current.classList.add("normal");
			wholePlayer.current.classList.remove("hover");
			wholePlayer.current.removeEventListener(
				"mousemove",
				onMouseMoveInFullScreen
			);
		}
	}, [screenfull.isFullscreen]);
	var intentTimeOut;
	return (
		<div
			ref={wholePlayer}
			// onMouseMove={onMouseMoveInFullScreen}
			className="video-player-wrapper normal"
		>
			<Player
				{...prop}
				ref={player}
				playing={playing}
				controls={controls}
				light={light}
				loop={loop}
				width={width}
				height={height}
				playbackRate={playbackRate}
				volume={volume}
				muted={muted}
				onReady={() => console.log("onReady")}
				onStart={() => console.log("onStart")}
				onPlay={handlePlay}
				onPause={handlePause}
				onBuffer={() => console.log("onBuffer")}
				onSeek={(e) => console.log("onSeek", e)}
				onEnded={handleEnded}
				onError={(e) => console.log("onError", e)}
				onProgress={handleProgress}
				onDuration={handleDuration}
			// wrapper={videoWrapper}
			/>
			<div className={"progress-wrapper"}>
				{/* <PlayerIcon.Play /> */}
				{/* <progress max={1} value={video.played} /> */}
				<div className="magic-progress-bar"></div>
				<ProgressBar
					className="progress-bar"
					isEnabled
					direction={Direction.HORIZONTAL}
					value={video.played}
					fakeValue={slider.fakePlayed}
					loaded={video.loaded}
					duration={video.duration}
					intent={slider.intent}
					hover={slider.hover}
					onChangeStart={(startValue) => {
						handleSeekStart();
						setSlider(() => ({ ...slider, intent: 0 }));
					}}
					onChange={(newValue) => handleSeekChange(newValue)}
					onChangeEnd={(endValue) => {
						setSlider(() => ({
							...slider,
							intent: 0,
							hover: false,
						}));
						handleSeekEnd(endValue);
					}}
					onIntent={(intent) => {
						clearTimeout(intentTimeOut);
						setSlider(() => ({ ...slider, intent: intent }));
					}}
					onIntentStart={() => setSlider(() => ({ ...slider, hover: true }))}
					onIntentEnd={() => {
						intentTimeOut = setTimeout(() => {
							setSlider({ ...slider, intent: 0, hover: false });
						}, 300);
					}}
				/>
				<div className="button-group-wrapper">
					<div className="button-group left">
						{handlePrevious && (
							<IconButton
								color="inherit"
								onClick={handlePrevious}
								edge="start"
								className="button"
							>
								<SkipPreviousRoundedIcon />
							</IconButton>
						)}
						{video.playing ? (
							<IconButton
								color="inherit"
								onClick={handlePause}
								edge="start"
								className="button"
							>
								<PauseRoundedIcon />
							</IconButton>
						) : (
							<IconButton
								color="inherit"
								onClick={handlePlay}
								edge="start"
								className="button"
							>
								<PlayArrowRoundedIcon />
							</IconButton>
						)}

						{handleNext && (
							<IconButton
								color="inherit"
								onClick={handleNext}
								edge="start"
								className="button"
							>
								<SkipNextRoundedIcon />
							</IconButton>
						)}

						<div className="volume">
							<IconButton
								color="inherit"
								onClick={handleToggleMuted}
								edge="start"
								className="button volume-button"
							>
								{video.volume >= 0.6 ? (
									<VolumeUpRoundedIcon />
								) : video.volume >= 0.3 ? (
									<VolumeDownRoundedIcon />
								) : video.volume > 0 ? (
									<VolumeMuteRoundedIcon />
								) : (
									<VolumeOffRoundedIcon />
								)}
							</IconButton>
							<input
								className="volume-slide"
								orient={isMobile ? "vertical" : "horizontal"}
								type="range"
								min={0}
								max={1}
								step="any"
								value={video.volume}
								onChange={handleVolumeChange}
							/>
							{/* <Slider
								className="volume-slide"
								min={0}
								max={1}
								step={null}
								value={video.volume}
								onChange={handleVolumeChange}
								orient={isMobile ? "vertical" : "horizontal"}
							/> */}
							<FormattedTime
								className="timestamp"
								numSeconds={video.duration * video.played}
							/>
							&nbsp;/&nbsp;
							<FormattedTime
								className="timestamp"
								numSeconds={video.duration}
							/>
						</div>
					</div>
					<div className="button-group right">
						{showSpeed &&
							[2, 1.75, 1.5, 1.25, 1, 0.75, 0.5, 0.25].map((speed) => (
								<IconButton
									color="inherit"
									onClick={() => handleSetPlaybackRate(speed)}
									edge="start"
									className=""
								>
									<div className="timestamp small">x{speed}</div>
								</IconButton>
							))}
						{!isMobile && (
							<IconButton
								color="inherit"
								onClick={toggleShowSpeed}
								edge="start"
								className="button"
							>
								<div className="timestamp">{video.playbackRate}x</div>
								<FastRewindRoundedIcon />
							</IconButton>
						)}

						<IconButton
							color="inherit"
							onClick={handleClickFullscreen}
							edge="start"
							className="button"
						>
							<AspectRatioRoundedIcon />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
}
