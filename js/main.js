const countrySelect = document.querySelector(".country-select");
const countryName = document.querySelector(".country-name");
const flagWrap = document.querySelector(".flag-wrap");
const contentDetails = document.querySelector(".content-details");

//Functon for list of countries
const countries = () => {
  fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then(datas => {
      for (let i = 0; i < datas.length; i++) {
        countrySelect.innerHTML += `<option value="${datas[i].alpha3Code}">${datas[i].name}</option>`;
      }
    });
};
countries();

//Function for single country details
const country = () => {
  let cshort = countrySelect.value;
  if (cshort === "s-country") {
    countryName.innerHTML = `<h4 class="text-center text-danger my-5">Please Select a Country</h4>`;
    contentDetails.innerHTML = "";
    flagWrap.innerHTML = "";
  } else {
    fetch(`https://restcountries.eu/rest/v2/alpha/${cshort}`)
      .then(res => res.json())
      .then(datas => {
        let cname = datas.name;
        let capital = datas.capital;
        let languages = datas.languages[0].name;
        let region = datas.region;
        let regionalBlocs = datas.regionalBlocs.map(block => block.acronym);
        let callingCodes = datas.callingCodes[0];
        let timezones = datas.timezones[0];
        let population = (datas.population / 1000000).toFixed(2);
        let pcolor = population > 100 ? "danger" : "success";
        countryName.innerHTML = `<h3 class="text-center mt-5">${cname.toUpperCase()}</h3>`;

        contentDetails.innerHTML = `<h4 class=" text-secondary mt-5 mb-3">Capital City: <span class="text-dark">${capital}</span>.</h4>`;
        contentDetails.innerHTML += `<h4 class=" text-secondary mb-3">Language: <span class="text-dark">${languages}</span>.</h4>`;
        contentDetails.innerHTML += `<h4 class=" text-secondary mb-3">Population: <span class="text-${pcolor}">${population}</span> million.</h4>`;
        contentDetails.innerHTML += `<h4 class=" text-secondary mb-3">Region: <span class="text-dark">${region}</span>.</h4>`;
        contentDetails.innerHTML +=
          regionalBlocs.length !== 0
            ? `<h4 class=" text-secondary mb-3">Region Blocks: <span class="text-dark">${regionalBlocs}</span>.</h4>`
            : "";
        contentDetails.innerHTML += `<h4 class=" text-secondary mb-3">Calling Codes: <span class="text-dark">+${callingCodes}</span></h4>`;
        contentDetails.innerHTML += `<h4 class=" text-secondary mb-3">Time Zone: <span class="text-dark">${timezones}</span>.</h4>`;
        flagWrap.innerHTML = `<img class="img-fluid mt-3" src="${datas.flag}" alt="${cname} flag image">`;
      });
  }
};

countrySelect.addEventListener("change", country);
country();
