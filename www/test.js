/*globals $:false */
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
$( document ).ready(function () {
	var zip = $("#zip").text();
	loadWeather(zip);
});
