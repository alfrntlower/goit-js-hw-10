import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countryCardTpl from './country-card.hbs';
import countriesPreview from './country-preview.hbs';
import Notiflix from 'notiflix';
import _ from 'lodash';


const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryContainer = document.querySelector('.country-info');
const countriesPreviewList = document.querySelector('.country-list');

countryInput.addEventListener("input", _.debounce(onSearchApi,DEBOUNCE_DELAY));

function onSearchApi(evt) {

    let countryName = evt.target.value.trim();

    if (!countryName) return;

        fetchCountries(countryName).
            then((countries) => {
                renderCountries(countries);
            }).catch(onFetchError);

}

function renderCountries( countries ) {

    if (countries.length > 1 && countries.length < 10) {

        const markupPreview = countriesPreview(countries);
        countriesPreviewList.innerHTML = markupPreview;
        countryContainer.innerHTML = '';
        
    }

    if (countries.length === 1) {
        countriesPreviewList.innerHTML = '';
        const markup = countryCardTpl(...countries);
        countryContainer.innerHTML = markup;
    }

    if (countries.length > 10 ) {
        Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
        countriesPreviewList.innerHTML = '';
        countryContainer.innerHTML = '';
    }
 
}

function onFetchError(error) {
    Notiflix.Notify.failure(`Oops, there is no country with that name`);
}




