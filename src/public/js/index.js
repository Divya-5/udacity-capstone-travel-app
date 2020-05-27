import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.scss';
import 'bootstrap';
const $ = require("jquery");
import { getLocation, getForecast, getImgUrl, getInfo } from './weatherRequest';
import { modalPopup } from './appear';
import { getCityLocation, getStartDate, getEndDate } from './details'

const travelling = {};

/* Button  functions */

const searchTripDetails = async (e) => {
  e.preventDefault();

  travelling.city = getCityLocation();
  console.log("travelling.city", travelling.city);
  travelling.start = getStartDate()
  console.log(" travelling.start", travelling.start);
  travelling.end = getEndDate();
  console.log("travelling.end", travelling.end);

  const geoLocation = await getLocation(travelling.city);
  console.log("geoLocation", geoLocation);
  travelling.latitude = geoLocation.latitude;
  console.log("travelling.latitude", travelling.latitude);
  travelling.longitude = geoLocation.longitude;
  console.log("travelling.longitude", travelling.longitude);
  travelling.countryCode = geoLocation.countryCode;
  console.log("travelling.countryCode", travelling.countryCode);

  travelling.weatherForecast = await getForecast(travelling.latitude, travelling.longitude);
  console.log("travelling.weatherForecast", travelling.weatherForecast);
  const countryInfo = await getInfo(travelling.countryCode);

  travelling.country = countryInfo.name;
  travelling.countryFlag = countryInfo.flag;

  travelling.image = await getImgUrl(travelling.city, travelling.country);

  console.log(travelling);

  modalPopup(travelling);
}


const cancellation = (e) => {
  e.preventDefault();
  $('#tripModal').modal('toggle');
  document.querySelector('.caption').style.display = 'block';
}

/* Add event listeners */

document.getElementById('button_search').addEventListener('click', searchTripDetails);


document.querySelectorAll('.trip_cancel').forEach(element => {
  element.addEventListener('click', cancellation);
});
