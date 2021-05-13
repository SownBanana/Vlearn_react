import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	"@global": {
		".App": {
			paddingBottom: "48px",
			// width: "99%",
			[theme.breakpoints.up("sm")]: {
				paddingBottom: 0,
				// width: "100%",
			},
		},
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

		blockquote: {
			overflow: "hidden",
			paddingRight: "1.5em",
			paddingLeft: "1.5em",
			marginLeft: 0,
			marginRight: 0,
			fontStyle: "italic",
			borderLeft: "5px solid #ccc",
		},
	},
}));
