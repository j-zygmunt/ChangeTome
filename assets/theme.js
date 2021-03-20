import {createMuiTheme} from '@material-ui/core/styles';

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
})

export default myTheme;