/*globals $:false */
function getheadlines()	{
	var newsdata = new Request('https://newsapi.org/v1/articles?source=techcrunch&apiKey=86bc4a59e125418193bbf569eac810d2');
    var headline1=newsdata.articles[0].title;
	$(".headline").html(headline1);
}
function loadWeather(location) {
    'use strict';
    $.simpleWeather({
        location: location,
        unit: 'f',
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
function greeting(){
	'use strict';
	var today = new Date();
	 if (today.getHours() > 11) {
        $(".greeting").html("Hello!");    //if before noon say good morning
    } else {
        $(".greeting").text("Good Morning!");
	}
}
function hourFormat(i) {
    'use strict';
    if (i > 12) {
        i = i - 12;
    }
    return i;
}

function getNews()
{
	var url = 'https://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=86bc4a59e125418193bbf569eac810d2';

	var req = new Request(url);

	fetch(req)
		.then(function(response) {
			console.log(response.json());
		})
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

function checkTime(i) {
    'use strict';
    if (i < 10) {
        i = "0" + i;
    }  // add zero in front of numbers < 10
    return i;
}
function startTime() {
    'use strict';
    var today = new Date(),
        h = hourFormat(today.getHours()),
        m = checkTime(today.getMinutes()),
        t = setTimeout(startTime, 500);
    $(".time").html(h + ":" + m);
}
$(document).ready(function () {
    'use strict';
	var mytext = {contents: ""};
	readTextFile("file:///C:/Users/Isaac/Documents/SrDesign/SeniorDesignSmartMirror-master/config.txt",mytext);
	//var unparsedconfig = '{ "weather":false, "time":true, "greeting":true}';
	var config = JSON.parse(mytext.contents);
	if (config.weather === true){
    loadWeather("56001", '');
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude,
            lon = position.coords.longitude,
            pos = lat + ',' + lon;
        loadWeather(pos);
    });
    setInterval(function () {
        navigator.geolocation.getCurrentPosition(function (position) {
			loadWeather(position.coords.latitude + ',' + position.coords.longitude);
		getheadlines();
        });
    }, 1000);} //update weather every this many ms
	if (config.time === true)
		startTime();
	if (config.greeting === true)
		greeting();
});