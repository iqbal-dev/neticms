
export function getMethod() {

  return  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': tokenData.token_type + " " + tokenData.access_token,
    }
  };
}
