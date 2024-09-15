import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
    const storeExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storeExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    const tokenDuration = getTokenDuration();

    if (!token) {
        return null;
    };
    if (tokenDuration < 0) {
        return 'EXPIRED'
    };
    return token;
}

export const tokenLoader = (() => getAuthToken());

export const checkAuthLoader = () => {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    } 
    return null;
}