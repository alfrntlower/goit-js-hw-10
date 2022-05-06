
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}`).then(response => response.json());
}

// export default { fetchCountries };