import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
	"@global": {
		".errorHelperText": {
			textAlign: "initial",
			color: "#f44336",
			marginLeft: "5px",
		},
		".noHeight": {
			height: 0,
		},
		".noPadding": {
			padding: 0,
		},
		".noPaddingTop": {
			paddingTop: " 0 !important",
		},
		// ".ck.ck-editor": {
		// 	position: "relative",
		// 	width: "100% !important",
		// },
		// // ".ck-content pre code": {
		// // 	color: "#353535",
		// // 	textShadow: "none",
		// // },
		// ".ck .ck-read-only": {
		// 	border: "none",
		// },
		blockquote: {
			overflow: "hidden",
			paddingRight: "1.5em",
			paddingLeft: "1.5em",
			marginLeft: 0,
			marginRight: 0,
			fontStyle: "italic",
			borderLeft: "5px solid #ccc",
		},
		// blockquote: {
		// 	background: "#f9f9f9",
		// 	borderLeft: "10px solid #ccc",
		// 	margin: "1.5em 10px",
		// 	padding: "0.5em 10px",
		// 	// quotes: `"\201C""\201D""\2018""\2019"`,
		// },
		// "blockquote:before": {
		// 	color: " #ccc",
		// 	content: "open-quote",
		// 	fontSize: "4em",
		// 	lineHeight: "0.1em",
		// 	marginRight: "0.25em",
		// 	verticalAlign: "-0.4em",
		// },
		// "blockquote p": {
		// 	display: "inline",
		// },
	},
});
