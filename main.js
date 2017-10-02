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
function hourFormat(i) {
    'use strict';
    if (i > 11) {
        $(".greeting").html("Hello!");    //if before noon say good morning
    } else {
        $(".greeting").text("Good Morning!");
    }
    if (i > 12) {
        i = i - 12;
    }
    return i;
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
        });
    }, 1000); //update weather every this many ms
    startTime();
});