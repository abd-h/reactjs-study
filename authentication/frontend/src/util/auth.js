import { redirect } from "react-router-dom";

// Timeout helper function showing the duration of time since last login;
export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem('expiration');
    console.log(storedExpirationDate);
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    // to deduct current time stamp from expiration time stamp;
    const duration = expirationDate.getTime() - now.getTime();
    console.log(duration);
    return duration;
}



// Helper function for containing generated token
export const getAuthToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }
    return token;
}

// Used on the root for controlling ui to display authenticate/logout
export const tokenLoader = () => {
    return getAuthToken();
}

// Used for preventing access to controlled pages without login
export const checkTokenLoader = () => {
    const token = getAuthToken();
    if (!token) {
        return redirect('/auth'); 
    }
    return null;
}

