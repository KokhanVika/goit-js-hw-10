import './css/styles.css';
import countryCard from './country-card.hbs'
import countryList from './country-list.hbs'
import { fetchCountries } from './fetchCountries'
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    cardContainer: document.querySelector(".country-list"),
    input: document.querySelector('#search-box'),
    countryInfo: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list'),
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput(evt) {
    const inputValue = (evt.target.value).trim();
    if (!inputValue) {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
    } else {
        fetchCountries(inputValue)
            .then(renderCountryCard)
            .catch(catchError);
    }
}

function renderCountryCard(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length >= 2) {
       const markup = countryList(countries)
        refs.countryList.innerHTML = markup;
        refs.countryInfo.innerHTML = '';
    }
    else {
        const markup = countryCard(countries)
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = markup;
    }
}

function catchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}