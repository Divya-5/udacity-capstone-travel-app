import 'bootstrap';
const $ = require("jquery");
import { countreverse } from './details';

const getTripDetails = (date) => {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const tripDateStored = new Date(date);
  const tripDateStoredText = `${days[tripDateStored.getDay()]}, ${months[tripDateStored.getMonth()]} ${tripDateStored.getDate()}, ${tripDateStored.getFullYear()}`;

  return tripDateStoredText;
}

const getWeatherInformation = (weatherForecast, leftDays, date) => {

  const weather = {
    temperature: 0,
    forecastTemp: 0
  };

  date = Date.parse(date);

  for (let i = 0; i < weatherForecast.data.length; i++) {
    weather.temperature = weatherForecast.data[0].temp;
    weather.forecastTemp = weatherForecast.data[i].temp;
  }
  return weather;
}

const modalPopup = (travelling) => {

  document.querySelector('.caption').style.display = 'none';

  $('#tripModal').modal({
    keyboard: false
  })

  document.querySelector('.trip_title').innerHTML = `<img src="${travelling.countryFlag}" class="flag"> ${travelling.city}, ${travelling.country}`;

  // Display location, dates and the duration
  document.querySelectorAll('.media_heading')[0].innerText = `${travelling.city}, ${travelling.country}`;

  //Start trip Date
  const tripStart = getTripDetails(travelling.start);
  //End trip Date
  const tripEnd = getTripDetails(travelling.end);
  document.querySelectorAll('.media_heading')[1].innerText = tripStart;
  document.querySelectorAll('.media_heading')[2].innerText = tripEnd;

  document.querySelectorAll('.media_heading')[3].innerText = `${countreverse(travelling.start, travelling.end)} days`;

  // Display left days to start the trip
  const leftDays = countreverse(new Date(), travelling.start);
  document.querySelector('.trip_countdown').innerText = `Your trip to ${travelling.city} is ${leftDays} days away`;

  // Display weather info
  const weather = getWeatherInformation(travelling.weatherForecast, leftDays, tripStart);
  if (leftDays < 7) {
    document.querySelector('.trip_weather').innerHTML = `<p class="mt-1">The current weather:</p>
                                                       <p class="mt-1">${weather.temperature}&deg;C</p>`;
  } else {
    document.querySelector('.trip_weather').innerHTML = `<p class="mt-1">Weather forecast for then:</p>
                                                       <p class="mt-1">${weather.forecastTemp}&deg;C</p>`;
  }
  // Display images
  document.querySelector('.images').setAttribute('src', travelling.image);

}

export { modalPopup };
