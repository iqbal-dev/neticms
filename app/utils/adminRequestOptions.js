export function adminRequestOptions() {
    let adminToken = JSON.parse(localStorage.adminToken);
    // console.log('adminToken', adminToken);

    const optionsGET = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + adminToken.access_token,
        },
    };

    const optionsPOST = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + adminToken.access_token,
        },
        body: {}
    };

    const optionsPUT = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + adminToken.access_token,
        },
        body: {}
    };

    const optionsDELETE = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + adminToken.access_token,
        },
        body: {}
    };

    return {
        GET: optionsGET,
        POST: optionsPOST,
        PUT: optionsPUT,
        DELETE: optionsDELETE,
    }
}