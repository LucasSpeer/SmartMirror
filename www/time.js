/*globals $:false */
function time()
{
	var mytext = {contents: ""};
	readTextFile("http://localhost/config.json",mytext);		//read config file every time in case of changes
	var config = JSON.parse(mytext.contents);		//get a JSON array from the raw file contents
	var time = $(".Time");
	var today = new Date();
	//t = setTimeout(startTime, 500);
	var hours = today.getHours();
	var minutes = today.getMinutes();
	if (minutes < 10)
	{
		minutes = "0" + minutes;
	}
	if (config.general.military === false)
	{
		if (hours > 12)
		{
			hours = hours - 12;
		}
	}
	var str = hours + ":" + minutes;
	if (config.general.military === false)
	{
		if (today.getHours() <= 12)
		{
			str = str + "AM";
		}
		else
		{
			str = str + "PM";
		}
	}
	
	time.text(str);
}
$( document ).ready(function () {
	'use strict'
	time(); //intialize time
	setInterval(function () {
		time();
	}, 1000); //Update time every second
});