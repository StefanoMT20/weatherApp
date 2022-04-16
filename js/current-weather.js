import weather from '../data/current-weather.js'

function setCurrentCity($el,city){
    $el.textContent = city;
}
function setCurrentDate($el){
    $el.textContent = '11-21-2222'
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
    //background
}
export default function currentWeather(){
    //GEO // API - WEATHER // CONFIG
    configCurrentWeather(weather)

}