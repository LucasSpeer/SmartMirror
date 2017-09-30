function loadWeather(location) {
    'use strict';
    $.simpleWeather({
        location: location,
        unit: 'f',
        success: function (weather) {
            var temp = weather.temp + '&deg;',
                city = weather.city + ', ' + weather.region;
            $(".location").text(city);
            $(".temperature").html(temp);
        },
        error: function (error) {
            $(".location").text("Chaska, MN");
            $(".temperature").html("69 f");
        }
    });
}
function hourFormat(i) {
    'use strict';
    if (i > 12) {
        i = i - 12;
        return i;
    }
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
        h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds(),
        t = setTimeout(startTime, 500);
    h = hourFormat(h);
    m = checkTime(m);
    s = checkTime(s);
    $(".time").html(h + ":" + m + ":" + s);
}
$(document).ready(function () {
    'use strict';
	startTime();
    navigator.geolocation.getCurrentPosition(function (position) {
	    loadWeather(position.coords.latitude + ',' + position.coords.longitude);
	});
	navigator.geolocation.getCurrentPosition(function (position) {
	    setInterval(function () {loadWeather(position.coords.latitude + ',' + position.coords.longitude); }, 1000);
	});
});