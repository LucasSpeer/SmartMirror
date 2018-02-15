/*globals $:false */
function loadWeather(location, ForC) {
    'use strict';
	$.simpleWeather({
        location: location,
        unit: ForC,
        success: function (weather) {
            var temp = weather.temp + '&deg;',
				forecast = weather.forecast[3].text,
                city = weather.city + ', ' + weather.region;
            $(".location").text(city);			//assign .location class the text in city
            $(".temperature").html(temp);
			$(".forecast").text(forecast);
        },
        error: function (error) {
            $(".location").text("Mankato, MN");
            $(".temperature").html("69 f");
        }
    });
}
function readTextFile(file,mystring)
{
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200)
			{
				var allText = rawFile.responseText;
				mystring.contents += allText;
			}
		}
	}
	rawFile.send(null);
}
function Greeting(config)
{
	var greeting = $(".Greeting");
	var today = new Date();

	if ((today.getHours() < 24) && (today.getHours() > 16))
		{greeting.text("Good Evening");}
	if ((today.getHours() < 17) && (today.getHours() > 10))
		{greeting.text("Good Afternoon");}
	if (today.getHours() < 11)
		{greeting.text("Good Morning");}

}
function update(){
	var mytext = {contents: ""};
	readTextFile("http://localhost/config.json",mytext);		//read config file every time in case of changes
	var config = JSON.parse(mytext.contents);		//get a JSON array from the raw file contents
	var zip = config.weather.zipcode;		//get zipcode for loadweather()
	Greeting(config);		//set dynamic greeting
	var ForC;
	if(config.weather.useC === true){
		ForC = 'c';
	}
	else{
		ForC = 'f';
	}
	loadWeather(zip,ForC);		//set weather
}
$( document ).ready(function () {
	'use strict'
	update();//the initial execution is required because set interval will wait before executing for the first time
	setInterval(function () {
		update();
	}, 2000); //Update everything but time(handled in time js) every 2 seconds
});

