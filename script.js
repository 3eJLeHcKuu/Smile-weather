const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCity_Icon = document.querySelector(".city-icon");


const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "02caa6a2269b8aca4b221c45e0eedc4d";

async function checkWeather(city) {
    try {
        if (!city.trim()) {
            alert("Please enter a city name");
            return;
        }

        const response = await fetch(apiUrl + city + `&units=metric&appid=${apiKey}`);


        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();


            console.log(data);

            document.querySelector(".city-name").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            document.querySelector(".weather-name").innerHTML = data.weather[0].main;

            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    weatherCity_Icon.src = "images/mist-city.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    weatherCity_Icon.src = "images/city.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    weatherCity_Icon.src = "images/city.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    weatherCity_Icon.src = "images/mist-city.png";
                    break;
                case "Snow":
                    weatherIcon.src = "images/snow.png";
                    weatherCity_Icon.src = "images/city.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    weatherCity_Icon.src = "images/clear-city.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png";
                    weatherCity_Icon.src = "images/default-city.png";
                    break;
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value).then(() => {
        searchBox.value = "";
    }).catch((error) => {
        console.error("Error fetching weather:", error);
    });
});
