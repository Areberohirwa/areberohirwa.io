const cityName = document.querySelector('.city-name');
const tempe = document.querySelector('.temp-nows')
const visibility = document.querySelector('.vis-data');
const wind = document.querySelector('.wind-data')
const pressure = document.querySelector('.pres-data');
const weathery = document.querySelector('.rain-percs')
const weatherStatus = document.querySelector('.weat-data');
const feelLike = document.querySelector('.feel-data')
const humidity = document.querySelector('.prec-data');
const searchBox = document.querySelector('.searched');
const searchBtn = document.querySelector('.search')
const sunRise = document.querySelector('.sunshine-time');
const sunSet = document.querySelector('.sunset-time');
const weatherIcon = document.querySelector('.icon')

const apiKey = "142abb0e042aff9d787f8696252a9cd9"
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    console.log(data);

    // Convert sunrise and sunset timestamps to human-readable format
    function formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2);
    }

    cityName.innerHTML = data.name;
    tempe.innerHTML = Math.round(data.main.temp);
    weathery.innerHTML = data.sys.country;
    pressure.innerHTML = data.main.pressure;
    wind.innerHTML = data.wind.speed;
    feelLike.innerHTML = Math.round(data.main.feels_like);
    visibility.innerHTML = data.visibility;
    humidity.innerHTML = data.main.humidity;
    weatherStatus.innerHTML = data.weather[0].description;
    sunRise.innerHTML = formatTime(data.sys.sunrise)+ ' h' ;
    sunSet.innerHTML = formatTime(data.sys.sunset) + ' h';

    // Set weather icon based on weather condition
    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = 'img/clouds.png';
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = 'img/clear.png';
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = 'img/rain.png';
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = 'img/drizzle.png';
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = 'img/mist.png';
    } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = 'img/snow.png';
    }
}

searchBtn.addEventListener('click', function () {
    checkWeather(searchBox.value);
});