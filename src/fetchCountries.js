export function fetchCountries (contryName) {
  return fetch(`https://restcountries.com/v3.1/name/${contryName}?fields=name,capital,population,flags,languages,fifa`)
    .then(res => {
      if (res.ok) {
        return res.json() 
      }
    })
}
  