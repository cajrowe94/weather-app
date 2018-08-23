//http://api.openweathermap.org/data/2.5/weather?lat=40.9874513&lon=-86.2867407
//open weather API url
let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?'; //add lat={lat}&lon={lon} onto end to get weather
//apiKey
const key = '3abbc520bb52503aacaac2323c78cc4f';

//latitude and longitude variables
let lat;
let lon;

let counter = 0;
//stores current location weather
let localWeather = {};

$(document).ready(function(){
	//get canvas crap


	//get location
	askLocation();

	$("#tempTitle").hide();
	$("#humTitle").hide();
	$("#overTitle").hide();
	$("#overview").hide();
	$("humPercent").hide();
	$("#loc").hide();
	

	setInterval(function(){
		if (lat != undefined && lon != undefined && counter == 0) getWeather();
	}, 100);

});

function askLocation(){
	//ask the browser for the latitude and longitude
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
        	var location = pos.coords;
        	lat = location.latitude;
        	lon = location.longitude;
        	console.log("Location found, here are your coordinates:")
        	console.log("latitude: " + lat);
        	console.log("longitude: " + lon);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

function getWeather(){
	counter++
	weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?';
	var addtoUrl = "lat=" + lat + "&lon=" + lon;
	//add all queries to URL
	weatherUrl+=addtoUrl;
	weatherUrl+="&units=metric&id=524901&APPID=";
	weatherUrl+=key;
	weatherUrl+="&callback=?";
	//get JSON with weatherURL
	$.getJSON(weatherUrl, function(data) {
		logData(data.main.temp, data.main.humidity, data.weather[0].main, data.weather[0].description, data.name);
  		console.log(data);
	});
};

function logData(temp, hum, main, desc, name){
	//assign all local weather to variables
	localWeather = {
		"cTemp": Math.floor(temp) + "&deg C",
		"fTemp": Math.floor(temp*(9/5)+32) + "&deg F",
		"humidity": hum + "%",
		"overview": main,
		"description": desc,
		"location": name
	};
	showData();
}

function showData(){
	//display the data in th elist items
	$("#cels").html(localWeather.cTemp);
	$("#fah").html(localWeather.fTemp);
	$("#humPercent").html(localWeather.humidity);
	$("#overview").html(localWeather.description);
	$("#loc").html(localWeather.location);

	//animate them in
	$("#overTitle").fadeIn("slow");
	$("#tempTitle").fadeIn("slow");
	$("#humTitle").fadeIn("slow");
	$("#loc").fadeIn("slow");
	$("#cels").css({left: '51%'});
	$("#fah").css({right: '51%'});
	$("#humPercent").fadeIn("slow");
	$("#overview").fadeIn("slow");



}







