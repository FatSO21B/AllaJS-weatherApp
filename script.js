import config from'./config.js';

const myLocation = ()=> {
  getOurDate()
  const success = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getGeo(lat, lon)
  }

  const error = () => {
    return 
  }

  navigator.geolocation.getCurrentPosition(success, error)

  const apiGeo = {
    endpoint: "https://api.openweathermap.org/geo/1.0/reverse?",
    key: config.apiKey
  }
  async function getGeo(lat, lon) {
    const resGeo = await fetch(`${apiGeo.endpoint}lat=${lat}&lon=${lon}&limit=1&appid=${apiGeo.key}`)
    const resultGeo = await resGeo.json()
    let myCity = resultGeo[0].name
    getInfo(myCity)
  }
}

document.onload = myLocation()


const api = {
  endpoint: "https://api.openweathermap.org/data/2.5/",
  key: config.apiKey
}

const input = document.querySelector("#input")
input.addEventListener('keypress', enter)

function enter(e) {
  if(e.key === "Enter") {
    getInfo(input.value);
    input.value = ''
  }
}

async function getInfo(data) {
  const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appid=${api.key}`)
  const result = await res.json()
  displayResult(result)
}

function displayResult(result) {
  const city = document.querySelector("#city")
  city.textContent = `${result.name}, ${result.sys.country}`

  getOurDate()

  const temperature = document.querySelector("#temperature")
  temperature.textContent = `${Math.round(result.main.temp)}°`

  const feelsLike = document.querySelector("#feelsLike")
  feelsLike.textContent = `Feels like: ${Math.round(result.main.feels_like)}°`

  const weatherIcon = document.querySelector("#weatherIcon")
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/w/${result.weather[0].icon}.png`)
  weatherIcon.setAttribute("alt", `${result.weather[0].main}`)

  const conditions = document.querySelector("#conditions")
  conditions.textContent = `${result.weather[0].main}`

  const variation = document.querySelector("#variation")
  variation.textContent = `Min: ${Math.round(result.main.temp_min)}° Max: ${Math.round(result.main.temp_max)}°`
}

function getOurDate() {
  const myDate = new Date;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const day = days[myDate.getDay()]

  const date = myDate.getDate()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[myDate.getMonth()]

  const year = myDate.getFullYear()

  document.querySelector('#date').textContent = `${day} ${date} ${month} ${year}`
}

