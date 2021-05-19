const { createMuiTheme } = require("@material-ui/core");

export default createMuiTheme({
	overrides: {
		MuiDropzoneArea: {
			root: {
				maxWidth: "300px",
				maxHeight: "170px",
				minHeight: "90px",
				margin: "auto",
			},
			textContainer: {
				position: "absolute",
				width: "100%",
			},
			text: {
				fontSize: "12px",
				marginBottom: 0,
				marginTop: 10
			}
		},
		MuiDropzonePreviewList: {
			root: {
				display: "none",
				width: "100%",
				margin: 0,
				height: "100%",
				position: "absolute",
			},
			imageContainer: {
				width: "100%",
				padding: "0 !important",
				maxWidth: "unset",
				flexBasis: "unset",
			},
			image: {
				width: "100%",
				height: "100%",
			},
		},
	},
});
