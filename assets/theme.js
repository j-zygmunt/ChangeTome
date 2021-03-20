import {createMuiTheme} from '@material-ui/core/styles';

const myTheme = createMuiTheme({
    palette:{
        type:'light',
        primary: {
            main: '#FF8754',
            contrastText: "#ffffff",
        },
        secondary: {
            main: '#FF8754'
        }
    },
})

export default myTheme;