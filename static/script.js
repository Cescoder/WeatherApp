//INPUT ELEMENTS
const input_city = document.getElementById('city_input');

//OUTPUT ELEMENTS
const cityElement = document.getElementById('city');
const cloudPctElement = document.getElementById('cloud_pct');
const tempElement = document.getElementById('temp');
const feelsLikeElement = document.getElementById('feels_like');
const humidityElement = document.getElementById('humidity');
const minTempElement = document.getElementById('min_temp');
const maxTempElement = document.getElementById('max_temp');
const windSpeedElement = document.getElementById('wind_speed');
const windDegreesElement = document.getElementById('wind_degrees');
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');

function searchCity(){
    console.log('Button Clicked')
    //Get City Name
    var city = input_city.value.toLowerCase();

    //Request to fastapi
    fetch(`http://localhost:8000/weather/${city}`)
    .then(response => response.json())

    .then(data => {
        console.log(data);
        cityElement.innerHTML = city;
        cloudPctElement.innerHTML = data.cloud_pct + 'm';
        tempElement.innerHTML = data.temp + '°C';
        feelsLikeElement.innerHTML = data.feels_like + '°C';
        humidityElement.innerHTML = data.humidity + '%';
        minTempElement.innerHTML = data.min_temp + '°C';
        maxTempElement.innerHTML = data.max_temp + '°C';
        windSpeedElement.innerHTML = data.wind_speed + 'm/s';
        windDegreesElement.innerHTML = data.wind_degrees + '°';

        //Convert Unix to Date, keeping in mind the timezone
        const sunriseTime = new Date(data.sunrise * 1000);
        const sunsetTime = new Date(data.sunset * 1000);

        //metti lo 0 se i minuti  e le ore sono < 10
        const sunriseHours = sunriseTime.getHours() < 10 ? '0' + sunriseTime.getHours() : sunriseTime.getHours();
        const sunriseMinutes = sunriseTime.getMinutes() < 10 ? '0' + sunriseTime.getMinutes() : sunriseTime.getMinutes();
        const sunsetHours = sunsetTime.getHours() < 10 ? '0' + sunsetTime.getHours() : sunsetTime.getHours();
        const sunsetMinutes = sunsetTime.getMinutes() < 10 ? '0' + sunsetTime.getMinutes() : sunsetTime.getMinutes();

        //specifica che e' orario locale
        sunriseElement.innerHTML = sunriseHours + ':' + sunriseMinutes + ' (Local Time)';
        sunsetElement.innerHTML = sunsetHours + ':' + sunsetMinutes + ' (Local Time)';
        


    })
    .catch(error => console.error('Error:', error));

    //Clear input
    input_city.value = '';

    //Prevent form from submitting
    return false;
}