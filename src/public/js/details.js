// Get user location and date input on  submit
const getCityLocation = () => {
  
  let city = document.getElementById('city').value;

  city = city.toLowerCase();
  city = city[0].toUpperCase() + city.slice(1);

  console.log(city);

  return city;
}

const getStartDate = () => {

  const date = document.getElementById('date_start').value.split('-');

  return date.join('/');
}

const getEndDate = () => {
  const date = document.getElementById('date_end').value.split('-');

  return date.join('/');
}

const countreverse = (start, end) => {

  const tripStart = Date.parse(start);
  const tripEnd = Date.parse(end);

  const countreverse = tripEnd - tripStart;

  const leftDays = Math.ceil(countreverse / 86400000);

  console.log(leftDays);

  return leftDays;
}

export { getCityLocation, getStartDate, getEndDate, countreverse};