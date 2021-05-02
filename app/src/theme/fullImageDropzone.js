const { createMuiTheme } = require("@material-ui/core");

export default createMuiTheme({
	overrides: {
		MuiDropzoneArea: {
			root: {
				// overflow: "unset",
			},
			textContainer: {
				position: "absolute",
				width: "100%",
			},
		},
		MuiDropzonePreviewList: {
			root: {
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
