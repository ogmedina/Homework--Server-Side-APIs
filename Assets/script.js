
//on search button click function begins
$("#button").on("click", function(event){
    event.preventDefault();
//a variable is assigned to city based on the value from the search button
var city = $("#search").val();
//URL for forecast for the city with the API
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c24c77657bb5fc9d770bfb807a1ef0f8";
//Date is from the moment.js library and formated
var currentDate = moment().format('MM/DD/YYYY')

//first ajax call for forcast -- data is saved into response
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){

    console.log(response);
    console.log(city);
    //lattitude and longitude are saved for the 2nd ajax call for UV Index    
    var lat = response.city.coord.lat;
    var long = response.city.coord.lon;

    console.log(lat);
    console.log(long);
    
    //Code is written for main box into html tags from response data
    $(".city").html("<h1>" + response.city.name + " " + currentDate + "</h1>");
    $(".mainimage").html("<img src='https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png'>")
    var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
    $(".tempF").html("<h6>" + "Temperature: " + tempF.toFixed(1) + " &#8457;" + "</h6>");
    $(".humidity").html("<h6>" + "Humidity: " + response.list[0].main.humidity + " %" + "</h6>");    
    $(".wind").html("<h6>" + "Wind Speed: " + response.list[0].wind.speed + " MPH" + "</h6>");
    //2nd ajax call from API for UV Index URL declared as variable 
    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=c24c77657bb5fc9d770bfb807a1ef0f8"; 

    //ajax call for UV -- data saved into resuls
    $.ajax({
        url: queryURLUV,
        method: "GET"
    }).then(function(result){

        console.log(result);

        //UV index is put into variable
        var uvIndex = result.value; 
        //main html line to write UV
        $(".uv").html("<h6>" + "UV Index: " + "<div class = color>" + uvIndex + "</div>" + "</h6>");
        //color coding if/else statements based on number returned
        if (uvIndex > 8){
            $(".color").css("background-color", "purple");
        } else if (uvIndex > 3){
            $(".color").css("background-color", "orange");
        }
        else {
            $(".color").css("background-color", "green");
            $(".color").css("color", "white");
        }



    });
    



    
   // console.log(response.clouds);

   // console.log(response.name);

   // var results = response.data; 

 //   console.log(results[0].name);

  

    
});




});

//forecast is the 5 day plus projection, it comes in at 7 different times, want to focus on 9:00 and 12:00
//but if the user logs in late in the day? does it automatically go into the next days forecast?
//also need to work on second ajax call for the projection or can both go into the same response?


//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


//"https://api.openweathermap.org/data/2.5/forecast?lat="

//https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

//"https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c24c77657bb5fc9d770bfb807a1ef0f8";


//navigator.geolocation.getCurrentPosition(function(position){
//let lat = position.coords.latitude.toFixed(2);
//let long = position.coords.longitude.toFixed(2);

//console.log(lat);
//console.log(long);