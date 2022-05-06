import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countryCardTpl from './country-card.hbs';

const DEBOUNCE_DELAY = 300;

const url = 'https://restcountries.com/v3.1/name/peru';
// fetch(url).then(response => response.json()).then(console.log)

const countryInput = document.querySelector('#search-box');
const countryContainer = document.querySelector('.country-info');

countryInput.addEventListener("input", onSearchApi);

function onSearchApi(evt) {
    
    let countryName = evt.target.value;

    console.log(countryName);

    fetchCountries(countryName).then((countries) => {
        renderCountries(countries);
    });

}

function renderCountries( countries ) {
    
    const markup = countryCardTpl(...countries);
    countryContainer.innerHTML = markup;
}




