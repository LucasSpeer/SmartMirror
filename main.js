$(document).ready(function() { 
	loadWeather('55318');
	navigator.geolocation.getCurrentPosition(function(position) {
		setInterval(function(position){loadWeather(position.coords.latitude+','+position.coords.longitude);}, 1000);
	});
});
function loadWeather(location) {
  $.simpleWeather({
    location: location,
    unit: 'f',
    success: function(weather) {
      temp = weather.temp+'&deg;';
      city = weather.city+', '+weather.region;
  
      $(".location").text(city);
      $(".temperature").html(temp);
    },
    error: function(error) {
      $(".location").text("Chaska, MN");
      $(".temperature").html("69 f");
    }
  });
}
