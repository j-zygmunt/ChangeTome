import axios from 'axios';
import jwtDecode from 'jwt-decode';

async function isAuthorized() {
    if (localStorage.getItem('token')) {
        if (jwtDecode(localStorage.getItem('token')).exp < Date.now() / 1000) {
            localStorage.removeItem('token');
        }
    } else {
        await axios.get('http://localhost:8080/api/refreshToken', {withCredentials: true})
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.access_token);
                }
            })
            .catch(error => {
                localStorage.removeItem('token');
            })
    }
    return localStorage.getItem('token') != null;
}

export default {isAuthorized};