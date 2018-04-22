/*globals $:false */
function loadWeather(location, ForC) {
    'use strict';
	$.simpleWeather({
        location: location,
        unit: ForC,
        success: function (weather) {
            var temp = weather.temp + '&deg;' + ForC.toUpperCase(),
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
function removeModules(spot){ 
	$(spot).removeClass("None");
	$(spot).removeClass("Weather");
	$(spot).removeClass("Greeting");
	$(spot).removeClass("Time");
	$(spot).removeClass("Email");
	$(spot).removeClass("News");
	//$(spot).removeClass("");
}
function assignSpots(config){
			var spots = [".l1",".r1",".l2",".r2",".l3",".r3"];
			//assign each spot it's module from config.JSON
			for(var i = 0; i < 6; i++){
				removeModules(spots[i]);		//clear all module classes
			}
			$(spots[0]).addClass(config.layout.l1);		
			$(spots[1]).addClass(config.layout.r1);
			$(spots[2]).addClass(config.layout.l2);
			$(spots[3]).addClass(config.layout.r2);
			$(spots[4]).addClass(config.layout.l3);
			$(spots[5]).addClass(config.layout.r3);
		}
function update(config){
	var zip = config.weather.zipcode;		//get zipcode for loadweather()
	var oldWeather = $(".Weather");
	assignSpots(config);
	var newWeather = $(".Weather");
	if(!oldWeather.hasClass("Weather")){
		newWeather.text("");
		newWeather.append( $( ".weatherContainer" ));
	}
	var ForC;
	if(config.weather.useC === true){
		ForC = 'c';
	}
	else{
		ForC = 'f';
	}
	loadWeather(zip,ForC);		//set weather
	Greeting(config);		//set dynamic greeting
}
$( document ).ready(function () {
	'use strict'
	var mytext = {contents: ""};
	readTextFile("http://localhost/config.json",mytext);		//read config file every time in case of changes
	var oldConfig = JSON.parse(mytext.contents);		//get a JSON array from the raw file contents
	var config = oldConfig;
	assignSpots(config);
	$(".l1").text("");
	update(config);//the initial execution is required because set interval will wait before executing for the first time
	var weatherSpot = $( ".Weather" );
	weatherSpot.text("");
	weatherSpot.append( $( ".weatherContainer" ));
	var emptySpots = $( ".None" );
	emptySpots.text("");
	$( ".Time" ).addClass( "mainText" );
	setInterval(function () {
		mytext = {contents: ""};
		readTextFile("http://localhost/config.json",mytext);		//read config file every time in case of changes
		config = JSON.parse(mytext.contents);					//get a JSON array from the raw file contents
		if(config != oldConfig){									//if the config file has not been changed don't update everything
			update(config);
			var weatherSpot = $( ".Weather" );
			weatherSpot.append( $( ".weatherContainer" ));
			var emptySpots = $( ".None" );
			emptySpots.text("");
			$( ".Time" ).addClass( "mainText" );
			update(config);
			oldConfig = config;
		}
	}, 2000); //Update everything but time(handled in time js) every this many ms
});

