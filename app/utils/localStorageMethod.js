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


export function setIp(ip) {
    return localStorage.setItem('ip', ip);
}


export function setCustomcmsId(customcmsid) {
    return localStorage.setItem('customcmsid', customcmsid);
}



export function setBrowser(browser) {
    return localStorage.setItem('browser', browser);
}


export function setOs(os) {
    return localStorage.setItem('os', os);
}


export function getClientIp() {
    return localStorage.getItem('ip');
}

export function getBrowser() {
    return localStorage.getItem('browser');
}

export function getOs() {
    return localStorage.getItem('os');
}


export function getCustomcmsId() {
    return localStorage.getItem('customcmsid');
}



