const apiKey = "02caa6a2269b8aca4b221c45e0eedc4d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCity_Icon = document.querySelector(".city-icon");
const weatherName = document.querySelector(".weather-name");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{

        let data = await response.json();

        console.log(data);

        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".weather-name").innerHTML = data.weather[0].main;


        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
            weatherCity_Icon.src = "images/mist-city.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
            weatherCity_Icon.src ="images/city.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
            weatherCity_Icon.src ="images/city.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
            weatherCity_Icon.src = "images/mist-city.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png";
            weatherCity_Icon.src ="images/city.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
            weatherCity_Icon.src = "images/clear-city.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }


}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    searchBox.value = "";
})