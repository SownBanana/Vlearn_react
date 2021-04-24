import { Slider, Direction } from "react-player-controls";

const BACKGROUND = "#cecece80";
const PRIMARY = "#4281E0c7";
const LOADED = "#9abef570";
const INTENT = "#28ceff40";

// A colored bar that will represent the current value
const SliderBar = ({ value, style }) => (
	<div
		style={Object.assign(
			{},
			{
				position: "absolute",
				background: BACKGROUND,
				borderRadius: 4,
			},
			{
				top: 0,
				bottom: 0,
				left: 0,
				width: `${value * 100}%`,
			},
			style
		)}
	/>
);

// A handle to indicate the current value
const SliderHandle = ({ value, style }) => (
	<div
		style={Object.assign(
			{},
			{
				position: "absolute",
				width: 14,
				height: 14,
				background: PRIMARY,
				borderRadius: "100%",
				transform: "scale(1)",
				transition: "transform 0.2s",
				"&:hover": {
					transform: "scale(1.3)",
					background: INTENT,
				},
			},
			{
				top: 0,
				left: `${value * 100}%`,
				marginTop: -4,
				marginLeft: -8,
			},
			style
		)}
	/>
);

// A composite progress bar component
const ProgressBar = ({ hover, value, intent, loaded, ...props }) => (
	<Slider
		direction={Direction.HORIZONTAL}
		// onChange={/* store value somehow */}
		style={{
			borderRadius: 4,
			background: BACKGROUND,
			cursor: "pointer",
		}}
		{...props}
	>
		<SliderBar
			direction={Direction.HORIZONTAL}
			value={loaded}
			style={{ background: LOADED }}
		/>

		<SliderBar
			direction={Direction.HORIZONTAL}
			value={value}
			style={{ background: PRIMARY }}
		/>

		<SliderBar
			direction={Direction.HORIZONTAL}
			value={intent}
			style={{ background: INTENT }}
		/>

		{/* <SliderHandle
			direction={Direction.HORIZONTAL}
			value={value}
			style={{ background: PRIMARY }}
		/> */}
	</Slider>
);

export { ProgressBar };
