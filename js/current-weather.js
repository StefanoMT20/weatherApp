import weather from '../data/current-weather.js'
import {formatDate, formatTemp} from '../utils/format-data.js'
import {weatherConditionsCode} from './constants.js'
import {getCurrentPosition} from './geolocation.js'

function setCurrentCity($el,city){
    $el.textContent = city;
}

function setCurrentDate($el){
    const date = new Date()
    const formattedDate = formatDate(date)
    $el.textContent = formattedDate 
}
function setCurrentTemperature($el, temp){
    $el.textContent = formatTemp(temp)
}
function solarStatus(sunsetTime, sunriseTime){
    const currentHours = new Date().getHours()
    const sunsetHours = sunsetTime.getHours()
    const sunriseHours = sunriseTime.getHours()
    if (currentHours > sunsetHours || currentHours < sunriseHours){
        return 'night'
    }
    return 'morning'
    
}

function setBackground($el, conditionCode, solarStatus){
    const weatherType = weatherConditionsCode[conditionCode]  
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio:2)').matches ? '@2x' : ''

    $el.style.backgroundImage = `url(../images/${solarStatus}-${weatherType}${size}.jpg)`
}
function configCurrentWeather(weather){
    //loader
    //date
    const $currentWeatherDate = document.querySelector('#current-weather-date')
    setCurrentDate($currentWeatherDate)
    //city
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const city = weather.name
    setCurrentCity($currentWeatherCity, city)
    //temp
    const temperature = weather.main.temp
    const $currentWeatherTemperature = document.querySelector('#current-weather-temp')
    setCurrentTemperature($currentWeatherTemperature, temperature)
    //background
    const sunriseTime = new Date (weather.sys.sunrise * 1000)
    const sunsetTime = new Date (weather.sys.sunset * 1000)
    const conditionCode = String(weather.weather[0].id).charAt(0)
    
    
    const $app = document.querySelector('#app')
    setBackground($app,conditionCode, solarStatus(sunriseTime, sunsetTime))
}


export default function currentWeather(){
    //GEO // API - WEATHER // CONFIG
    console.log('ESTO ES ANTES getcurrentPosition')
    getCurrentPosition().then((data)=>{
        console.log('hemos triunfado', data)
    })
    .catch((message)=>{
        console.log(message)
    })
    console.log('ESTO ES DESPUESS getcurrentPosition')
    configCurrentWeather(weather)

}