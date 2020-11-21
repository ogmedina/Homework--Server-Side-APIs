var citiesArr = [];

function renderButtons(){
    $("#saved").empty();
    for (var i = 0; i < citiesArr.length; i++){
        var divEl = $("<div>");
        divEl.addClass("btn btn-light cities");
       // a.attr("data-name", citiesArr[i]);
        divEl.attr("id", "search");
        divEl.text(citiesArr[i]);
        $("#saved").append(divEl);
        console.log("btn");        
    }
};

//on search button click function begins
$("#searchButton").on("click", function(event){
    event.preventDefault();
//a variable is assigned to city based on the value from the search button
var city = $("#search").val();
//URL for forecast for the city with the API
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c24c77657bb5fc9d770bfb807a1ef0f8";
//Date is from the moment.js library and formated
var currentDate = moment().format('MM/DD/YYYY')
//Days for forecast using moment.js
$(".futureMoment1").text(moment().add(1, 'days').format('L')); 
$(".futureMoment2").text(moment().add(2, 'days').format('L')); 
$(".futureMoment3").text(moment().add(3, 'days').format('L')); 
$(".futureMoment4").text(moment().add(4, 'days').format('L')); 
$(".futureMoment5").text(moment().add(5, 'days').format('L')); 

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

    //future day 1
    $(".futureIcon1").html("<img src='https://openweathermap.org/img/wn/" + response.list[8].weather[0].icon + ".png'>")
    var tempF1 = (response.list[8].main.temp - 273.15) * 1.80 + 32;
    $(".futureTemp1").html("Temperature: " + tempF1.toFixed(1) + " &#8457;");
    $(".futureHum1").html("Humidity: " + response.list[8].main.humidity + " %");

    //future day 2
    $(".futureIcon2").html("<img src='https://openweathermap.org/img/wn/" + response.list[16].weather[0].icon + ".png'>")
    var tempF2 = (response.list[16].main.temp - 273.15) * 1.80 + 32;
    $(".futureTemp2").html("Temperature: " + tempF2.toFixed(1) + " &#8457;");
    $(".futureHum2").html("Humidity: " + response.list[16].main.humidity + " %");

    //future day 3
    $(".futureIcon3").html("<img src='https://openweathermap.org/img/wn/" + response.list[24].weather[0].icon + ".png'>")
    var tempF3 = (response.list[24].main.temp - 273.15) * 1.80 + 32;
    $(".futureTemp3").html("Temperature: " + tempF3.toFixed(1) + " &#8457;");
    $(".futureHum3").html("Humidity: " + response.list[24].main.humidity + " %");

    //future day 4
    $(".futureIcon4").html("<img src='https://openweathermap.org/img/wn/" + response.list[32].weather[0].icon + ".png'>")
    var tempF4 = (response.list[32].main.temp - 273.15) * 1.80 + 32;
    $(".futureTemp4").html("Temperature: " + tempF4.toFixed(1) + " &#8457;");
    $(".futureHum4").html("Humidity: " + response.list[32].main.humidity + " %");

    //future day 5
    $(".futureIcon5").html("<img src='https://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + ".png'>")
    var tempF5 = (response.list[39].main.temp - 273.15) * 1.80 + 32;
    $(".futureTemp5").html("Temperature: " + tempF5.toFixed(1) + " &#8457;");
    $(".futureHum5").html("Humidity: " + response.list[39].main.humidity + " %"); 

    //list of search cities for <aside>
    citiesArr.push(response.city.name);
    console.log(citiesArr);
    localStorage.setItem("citiesArr", response.city.name);
    //var savedEl = document.querySelector("#saved");
    renderButtons();

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

    
});

});


