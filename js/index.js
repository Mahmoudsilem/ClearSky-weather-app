"use strict"

const day1 = {
    cityName: document.querySelector(".day1 #cityName"),
    dayOfWeek: document.querySelector(".day1 .day-of-week"),
    date: document.querySelector(".day1 .date"),
    maxTemp: document.querySelector(".day1 .max-temp"),
    wetherCondition: document.querySelector(".day1 .wether-condition"),
    wetherConditionImg: document.querySelector(".day1 .wether-condition-img")

}
const day2 = {
    dayOfWeek: document.querySelector(".day2 .day-of-week"),
    maxTemp: document.querySelector(".day2 .max-temp"),
    minTemp: document.querySelector(".day2 .min-temp"),
    wetherCondition: document.querySelector(".day2 .wether-condition"),
    wetherConditionImg: document.querySelector(".day2 .wether-condition-img")
}
const day3 = {
    dayOfWeek: document.querySelector(".day3 .day-of-week"),
    maxTemp: document.querySelector(".day3 .max-temp"),
    minTemp: document.querySelector(".day3 .min-temp"),
    wetherCondition: document.querySelector(".day3 .wether-condition"),
    wetherConditionImg: document.querySelector(".day3 .wether-condition-img")
}


const inputSearchLocation = document.getElementById("inputSearchLocation");


function getDay(currentDate) {
    const date = new Date(currentDate);
    const day = date.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[day];
}
function getDate(currentDate) {
    const date = new Date(currentDate);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const monthName = date.getMonth();
    const day = date.getDate();

    return `${day} ${monthNames[monthName]}`;
}


async function getCityWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=02cca43f9a9547ae840111326241310&q=${city}&days=7`);
        const data = await response.json();

        day1.cityName.innerHTML = data.location.name;

        //day of week Ex:monday
        day1.dayOfWeek.innerHTML = getDay(data.forecast.forecastday[0].date);
        day2.dayOfWeek.innerHTML = getDay(data.forecast.forecastday[1].date);
        day3.dayOfWeek.innerHTML = getDay(data.forecast.forecastday[2].date);

        //ex:7oct
        day1.date.innerHTML = getDate(data.forecast.forecastday[0].date);

        //min & max temp
        day1.maxTemp.innerHTML = data.forecast.forecastday[0].day.maxtemp_c;
        day2.maxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
        day3.maxTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
        day2.minTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
        day3.minTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c;

        //wether condition img
        day1.wetherConditionImg.setAttribute("src", `https:${data.forecast.forecastday[0].day.condition.icon}`);
        day2.wetherConditionImg.setAttribute("src", `https:${data.forecast.forecastday[1].day.condition.icon}`);
        day3.wetherConditionImg.setAttribute("src", `https:${data.forecast.forecastday[2].day.condition.icon}`);

        //wether-condition
        day1.wetherCondition.innerHTML = data.forecast.forecastday[0].day.condition.text;
        day2.wetherCondition.innerHTML = data.forecast.forecastday[1].day.condition.text;
        day3.wetherCondition.innerHTML = data.forecast.forecastday[2].day.condition.text;
    } catch (error) {
        console.log(error);
        
        alert("We're unable to retrieve the API product key at this time. This could be due to a temporary network issue or a problem with the API service. Please try again later.");       
    }



}


getCityWeather("cairo");
inputSearchLocation.addEventListener("keyup", function () {
    getCityWeather(this.value);
})
