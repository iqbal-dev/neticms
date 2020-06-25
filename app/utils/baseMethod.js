
export function getMethod() {

  return {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
}

export function postMethod(bodyData) {

  return {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: bodyData
  };
}

export function getMethodWithAuth(token) {

  return (
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token
      }
    }
  )

}

export function postMethodWithAuth(token, bodyData) {

  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token
    },
    body: bodyData
  }

}