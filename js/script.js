$(document).ready(function() {

    /* Gloabel openWeatherMap variables */
    var openWeatherMap_KEY = "e67228b54203e43fbc22d0372e379cb7";
    var openWeatherMap_URL = `http://api.openweathermap.org/data/2.5/weather?APPID=${openWeatherMap_KEY}`;

    /* Global mapboxAPI variables */
    var mapACCESS_TOKEN = "pk.eyJ1IjoibmRvcmEiLCJhIjoiY2tjb2VsMXJzMDliejJwcXp0aHEydWRtOCJ9.twYKoy8TNL8DKLX2H8Dt7Q";
    var mapboxAPI_URL = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapACCESS_TOKEN}`;
    var attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    var latitude = 40;
    var longitude = -100;
    var zoomLevel = 3;
    var myMap = L.map('mapid').setView([latitude, longitude], zoomLevel);

    var tiles = L.tileLayer(mapboxAPI_URL, {
        attribution: attribution,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapACCESS_TOKEN
    }).addTo(myMap);
    
    var weatherData = "weatherData";
    var popup = L.popup();
    

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(myMap);
            //let marker = L.marker([latitude, longitude])
        //marker.bindTooltip("my tooltip text").openTooltip();
        //myMap.createPane('labels');
        // marker.bindPopup(weatherData).openPopup();
           

    }

    myMap.on('click', onMapClick);

 

   

     

    $("#submit").on("click", function(event) {
        event.preventDefault();
        $.ajax({
            method: "GET",
            url: openWeatherMap_URL,
            dataType: "json",
            success: function(result, status) {
                alert("success");
            }
        }); // ajax	
    }); // btnSubmit



}); // ready
