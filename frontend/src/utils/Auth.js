export const BASE_URL = 'https://api.lavrukhina.nomoredomains.sbs';
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status)
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': 'https://lavrukhina.nomoredomains.sbs'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': 'https://lavrukhina.nomoredomains.sbs'
    },
    body: JSON.stringify({email, password})
  })
  .then((response => response.json()))
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse)
}