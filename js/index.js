let cityArray = [];
const weatherInput = document.querySelector(".weather-input");
const loader = document.querySelector(".loader");
const weatherButton = document.querySelector(".weather-button");
const city = document.querySelector(".city");
const degree = document.querySelector(".degree");
const description = document.querySelector(".description");
const icon = document.querySelector(".icon");
const humidity = document.querySelector(".humidity");
const cloudy = document.querySelector(".cloudy");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const date = document.querySelector(".date");
const weather = document.querySelector(".weather");
const weatherDetails = document.querySelector(".weather-details");

weatherInput.focus();

weatherInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    getWeatherData(weatherInput.value);
  }
});

weatherButton.addEventListener("click", function (event) {
  getWeatherData(weatherInput.value);
});

const getWeatherData = async (city) => {
  loader.style.display = "block";
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=fce2fc3b74a411961b0af7bbeff45192"
  );
  const weatherData = await response.json();
  if (weatherData.cod == 200) {
    const data = modifyWeatherData(weatherData);
    setDataToPage(data);
    if (!cityArray.includes(data.city)) {
      weatherInput.value = "";
      if (cityArray.length == 5) cityArray.shift();
      if (cityArray.length != 5) cityArray = [...cityArray, data.city];
    }
    setDataToCityList(cityArray);
  } else if (weatherData.cod == 400) {
    alert("No city found");
  }
  loader.style.display = "none";
  weatherInput.focus();
};

const cityList = document.querySelector(".city-list ul");
function setDataToCityList(cityArray) {
  let list = "";
  if (cityArray.length) {
    for (let i = 0; i <= cityArray.length - 1; i++) {
      list += "<li>" + cityArray[i] + "</li>";
    }
    cityList.innerHTML = list;
  }

  document.querySelectorAll(".city-list ul li").forEach(function (item) {
    item.addEventListener("click", function (event) {
      getWeatherData(event.target.innerHTML);
    });
  });
}

function modifyWeatherData(data) {
  const obj = {
    city: data.name,
    degree: Math.floor(data.main.temp / 10),
    description: data.weather[0]["main"],
    humidity: data.main.humidity,
    wind: data.wind.speed,
    pressure: data.main.pressure,
    cloudy: data.clouds.all,
    icon:
      "https://openweathermap.org/img/wn/" +
      data.weather[0]["icon"] +
      "@2x.png",
    date: new Date().toDateString(),
  };
  return obj;
}

function setDataToPage(data) {
  city.innerHTML = data.city;
  degree.innerHTML = data.degree;
  description.innerHTML = data.description;
  icon.src = data.icon;
  humidity.innerHTML = data.humidity + "%";
  cloudy.innerHTML = data.cloudy + "%";
  wind.innerHTML = data.wind + "km/h";
  pressure.innerHTML = data.pressure;
  date.innerHTML = data.date;
  weather.style.display = "flex";
  weatherDetails.style.display = "block";
}
