const apiURL = 'https://api.cryptonator.com/api/ticker/';

export function getPrice(endpoint) {
  const url = apiURL + endpoint;
  return fetch(url).then(response => response.json());
}