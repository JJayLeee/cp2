document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    //weather display
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=40e13e041b8848adba42f4e29b5b3ab5";
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json)
        let results = "<div id='weatherBox'>";
        results += "<h2>Weather in " + json.name + "</h2>";
        for (let i = 0; i < json.weather.length; i++) {
          results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>"
        results += "<h2> (" + json.main.temp_min + "&deg;F ~ " + json.main.temp_max + "&deg;F) </h2>";
        results += "<p>Humidity: " + json.main.humidity + "%</p>"
        results += "<p>"
        for (let i = 0; i < json.weather.length; i++) {
          results += json.weather[i].description
          if (i !== json.weather.length - 1)
            results += ", "
        }
        results += "</p></div>";
        document.getElementById("weatherResults").innerHTML = results;
      });
  
    //forecast display
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=40e13e041b8848adba42f4e29b5b3ab5";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        let forecast = "<div class='forecast_container'>";
        for (let i = 0; i < json.list.length; i++) {
          forecast += "<div class='forecast'><h4 class='forecast_date'>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h4>";
          forecast += "<p>Temperature: <strong>" + json.list[i].main.temp + "&deg;F</strong></p>";
          forecast += "<p>("+json.list[i].main.temp_min + "&deg;F ~ " + json.list[i].main.temp_max + "&deg;F)</p>";
          forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
          forecast += "<p>Humidity: " + json.list[i].main.humidity +"%</p>";
          forecast += "<p>" + json.list[i].weather[0].description + "</p></div>"
        }
        forecast += "</div>";
        document.getElementById("forecastResults").innerHTML = forecast;
      });
  });
  