
const tokenKey = 'userToken';
const username = 'userName';

export const setToken = (token: string) => {
    try {
        localStorage.setItem(tokenKey, token);
    }
    catch (err) {
        return '';
    }
}

export const getToken = ():string => {
    try {
        return localStorage.getItem(tokenKey) || '';
    }
    catch (err) {
        return '';
    }
}

export const setUserName = (name: string) => {
    try {
        localStorage.setItem(username, name);
    }
    catch (err) {
        return '';
    }
}

export const getUserName = ():string => {
    try {
        return localStorage.getItem(username) || '';
    }
    catch (err) {
        return '';
    }
}

