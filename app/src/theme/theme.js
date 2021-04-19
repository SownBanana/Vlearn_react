import { createMuiTheme } from "@material-ui/core";
import { blue, green, orange, red, yellow } from "@material-ui/core/colors";
import createPalette from "@material-ui/core/styles/createPalette";

const theme = createMuiTheme({
	palette: createPalette({
		// type: "dark",
		primary: {
			light: blue["100"],
			main: blue["900"],
			dark: blue["900"],
		},
		success: {
			light: green["100"],
			main: green["900"],
			dark: green["900"],
		},
		error: {
			light: red["100"],
			main: red["900"],
			dark: red["900"],
		},
		warning: {
			light: yellow["100"],
			main: yellow["900"],
			dark: orange["900"],
		},
	}),
});

export default theme;
