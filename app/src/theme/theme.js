import { createMuiTheme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
	palette: {
		// type: "dark",
		primary: {
			light: blue["100"],
			main: blue["900"],
			dark: blue["900"],
		},
	},
});

export default theme;
