import { createMuiTheme } from "@material-ui/core/styles"

const muiTheme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	palette: {
		primary: {
			light: "#4C94D4",
			main: "#197ACF",
			dark: "#11548F",
			contrastText: "#FFF"
		}
	}
})

export default muiTheme
