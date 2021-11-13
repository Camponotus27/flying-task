declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string;
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}
}
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({});

export default responsiveFontSizes(theme);
