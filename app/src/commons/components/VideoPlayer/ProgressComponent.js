import { Slider, Direction, FormattedTime } from "react-player-controls";

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
const SliderHandle = ({ value, style, children }) => (
	<div
		style={Object.assign(
			{},
			{
				position: "absolute",
				padding: "2px 5px",
				background: PRIMARY,
				color: "white",
				fontWeight: "bold",
				borderRadius: "7px",
				transform: "scale(1)",
				transition: "transform 0.2s",
			},
			{
				top: -25,
				left: `${value * 100 - 1.5}%`,
				marginTop: -4,
				marginLeft: -8,
			},
			style
		)}
	>
		{children}
	</div>
);

// A composite progress bar component
const ProgressBar = ({ hover, value, intent, loaded, duration, ...props }) => (
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
		{intent > 0 && (
			<SliderHandle
				direction={Direction.HORIZONTAL}
				value={intent}
				style={{ background: "#23232330" }}
			>
				<FormattedTime className="timestamp" numSeconds={duration * intent} />
			</SliderHandle>
		)}
	</Slider>
);

export { ProgressBar };
