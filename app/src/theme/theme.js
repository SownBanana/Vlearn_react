import { createMuiTheme } from "@material-ui/core";
import {
	blue,
	green,
	orange,
	red,
	yellow,
	amber,
} from "@material-ui/core/colors";
import createPalette from "@material-ui/core/styles/createPalette";

const theme = createMuiTheme({
	typography: {
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			// 'Open Sans',
			'Arial',
			'Roboto',
			'"Helvetica Neue"',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	palette: createPalette({
		// type: "dark",
		selected: {
			main: blue["500"],
			dark: blue["A200"],
		},
		primary: {
			light: blue["100"],
			main: blue["900"],
			dark: blue["900"],
		},
		success: {
			light: green["100"],
			main: green["600"],
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
		rate: {
			main: amber["500"],
			dark: amber["700"],
		},
	}),
});

export default theme;
