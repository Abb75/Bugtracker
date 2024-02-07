import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/';

export function isTokenExpired(token) {
    if (!token) {
        console.log('RRRRRR')
        // Supprimer les tokens du local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

       
    
        return true; // Si le token n'est pas présent, il est considéré comme expiré
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        return true; // Structure du token invalide
    }

    const tokenPayload = JSON.parse(atob(tokenParts[1]));
    const expirationTimestamp = tokenPayload.exp;
    const currentTimestamp = Math.ceil(Date.now() / 1000);

    return expirationTimestamp < currentTimestamp; // Vérifie si le token est expiré
}


const axiosInstance = axios.create({
    baseUrl: baseUrl,
    //timeout: 15000,
    headers: {
        Authorization: localStorage.getItem('access_token')
        ? 'JWT' + localStorage.getItem('access_token')
        : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});


axiosInstance.interceptors.response.use(
    (response) => {
        return response;


    },
    async function (error) {
        const originalRequest = error.config;
        if (typeof error.response === 'undefined') {
            alert('Server Off');
        return Promise.reject(error)
        }

        if ( error.response.status === 401 &&
            originalRequest.url === baseUrl + 'token/refresh/')
    {
        window.location.href = '/login/';
        return Promise.reject(error);
    }

    if (
        error.response.data.code === 'token_not_valid' &&
        error.response.status === 401 && 
        error.response.statusText === 'Unauthorized'
    ) {
        const refreshToken = localStorage.getItem('refresh_token');
    
    

    if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
        const now = Math.ceil(Date.now()/1000);
        console.log(tokenParts.exp)

        if (tokenParts.exp > now) {
            return axiosInstance
            .post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken})
            .then((response) => {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

                axiosInstance.defaults.headers['Authorization'] = 
                'JWT ' + response.data.access;

                originalRequest.headers['Authorization'] = 
                'JWT ' + response.data.access;

                return axiosInstance(originalRequest)
            })

            .catch((err) => {
                console.log(err)
            });
        } else {
            console.log('refresh token is expired' , tokenParts.exp, now);
            console.log('EEEEEE')
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login/';
        }

    }else {
        console.log('Refresk token not available');
        window.location.href = '/login/';
        }

    }

     return Promise.reject(error);

    }
);

export default axiosInstance;