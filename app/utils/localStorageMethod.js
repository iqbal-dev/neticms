export function getUrlInfoLocally() {
    return localStorage.getItem('urlInfo');
}

export function setUrlInfoLocally(urlInfoData) {
    return localStorage.setItem('urlInfo', urlInfoData);
}