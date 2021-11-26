import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core/styles';

const myTheme = createMuiTheme({
    palette:{
        type:'light',
        primary: {
            main: '#eeeeee',
            contrastText: "#ffffff",
        },
        secondary: {
            main: '#FF8754',
            contrastText: "#ffffff",
        }
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none',
                fontWeight: '700',
            },
        },
        a: {
            root: {
                underline: "none",
                textDecoration: "none"
            }
        }
    },
})

export default myTheme;