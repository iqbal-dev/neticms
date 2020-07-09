export function getUrlInfoLocally() {
    return localStorage.getItem('urlInfo');
}

export function setUrlInfoLocally(urlInfoData) {
    return localStorage.setItem('urlInfo', urlInfoData);
}

export function getAuthenticatedStatus() {
    return localStorage.getItem('authStatus');
}

export function setAuthenticatedStatus(authStatus) {
    return localStorage.setItem('authStatus', authStatus);
}