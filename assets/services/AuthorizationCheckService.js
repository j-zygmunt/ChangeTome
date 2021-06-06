import axios from "axios";
import jwtDecode from 'jwt-decode';

function isAuthorized(){
    if (localStorage.getItem('token')) {
        if(jwtDecode(localStorage.getItem('token')).exp < Date.now() / 1000) {
            localStorage.removeItem('token');
        }
    } else {
        axios.get('api/private/isAuthorized', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(response => {
            setTimeout(() => {
                if(response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                }
            }, 300);
        })
        .catch(error => {
            localStorage.removeItem('token');
        })
    }
}

export default {isAuthorized}