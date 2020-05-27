const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayKey = '16719403-d346f5686fec4ad13fe24da58';

const geonamesUrl = 'http://api.geonames.org/';
const geonamesKey = 'divya5';
const geonamesQuery = 'searchJSON?formatted=true&q=';

const WeatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?`;
const WeatherBitKey = '2557f3178c98452481a91057d217b7de';

async function getImgUrl(city, country) {
  const queryCity = `&q=${city}&image_type=photo&pretty=true&category=places`;
  const queryCountry = `&q=${country}&image_type=photo&pretty=true&category=places`

  const cityterminationpoint = `${pixabayURL}&key=${pixabayKey}&${queryCity}`;
  const countryterminationpoint = `${pixabayURL}&key=${pixabayKey}&${queryCountry}`;
  try {
    let response = await fetch(cityterminationpoint);
    if (response.ok) {
      let jsonRes = await response.json();
      if (jsonRes.totalHits === 0) {
        // show pictures for  country
        response = await fetch(countryterminationpoint);
        if (response.ok) {
          jsonRes = await response.json();
          return jsonRes.hits[0].largeImageURL;
        }
      }
      return jsonRes.hits[0].largeImageURL;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getLocation(location) {
  const terminationpoint = geonamesUrl + geonamesQuery + location + '&username=' + geonamesKey + '&style=full';

  try {
    const response = await fetch(terminationpoint);
    if (response.ok) {
      const location = {};
      const jsonRes = await response.json();

      location.latitude = jsonRes.geonames[0].lat;
      location.longitude = jsonRes.geonames[0].lng;
      location.countryCode = jsonRes.geonames[0].countryCode;

      console.log(location);
      return location;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getForecast(latitude, longitude) {
  const terminationpoint = `${WeatherBitUrl}&lat=${latitude}&lon=${longitude}&key=${WeatherBitKey}`;
  const response = await fetch(terminationpoint);
  try {

    if (response.ok) {
      const jsonRes = await response.json();
      console.log(jsonRes);
      return jsonRes;
    }
  } catch (error) {
    console.log(error);
  }
}


async function getInfo(countryCode) {
  const terminationpoint = `https://restcountries.eu/rest/v2/alpha/${countryCode}`
  try {
    const response = await fetch(terminationpoint);
    if (response.ok) {
      const jsonRes = await response.json();
      return {
        name: jsonRes.name,
        flag: jsonRes.flag
      }
    }
  } catch (error) {
    console.log(error);
  }
}


export { getLocation, getImgUrl, getInfo, getForecast };

