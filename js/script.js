$(document).ready(function() {

    /* Global openWeatherMap API variables */
    var openWeatherMap_URL = "https://api.openweathermap.org/data/2.5/onecall";
    var openWeatherMap_KEY = "e67228b54203e43fbc22d0372e379cb7";

    /* Global openCageDate API variables */
    var openCageData_URL = "https://api.opencagedata.com/geocode/v1/geojson";
    var openCageData_KEY = "410c8631fa9d4b9ab6fbfefd617f2922";

    /* Global mapbox API variables */
    var mapACCESS_TOKEN = "pk.eyJ1IjoibmRvcmEiLCJhIjoiY2tjb2VsMXJzMDliejJwcXp0aHEydWRtOCJ9.twYKoy8TNL8DKLX2H8Dt7Q";
    var mapboxAPI_URL = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}";
    var attribution = 'Map data &copy; <a href="https://www.map.org/">map</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    var latitude = 40;
    var longitude = -100;
    var zoomLevel = 3;
    var latlng;
    var city;
    var country;
    var continent;

    var map = L.map('mapid').setView([latitude, longitude], zoomLevel);
    var popup = L.popup();

    var streets = L.tileLayer(mapboxAPI_URL + "?access_token=" + mapACCESS_TOKEN, {
        attribution: attribution,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapACCESS_TOKEN
    }).addTo(map);


    $("#city").on("change", function(e) {
        e.preventDefault();
        //alert("city clicked");
        $.ajax({
            method: "GET",
            url: openCageData_URL,
            dataType: "json",
            data: {
                q: $("#city").val(),
                key: openCageData_KEY
            },
            success: function(result, status) {
                latitude = result.features[0].geometry.coordinates[1];
                longitude = result.features[0].geometry.coordinates[0];
                latlng = L.latLng(latitude, longitude);
                document.getElementById("latitude").innerHTML = latitude.toString();
                document.getElementById("longitude").innerHTML = longitude.toString();
                city = result.features[0].properties.components.city;
                country = result.features[0].properties.components.country;
                continent = result.features[0].properties.components.continent;
                popup.setLatLng(latlng);
                map.panTo(latlng);
                popup.setContent(latlng + " " + city + " " + country + " " + continent);
                
                alert(latlng + " " + city + " " + country + " " + continent);
                map.openPopup(popup);
                
            }
        }); //ajax
    });


    map.on('click', onMapClick);

    function onMapClick(e) {


    }











    // $("#submit").on("click", function(event) {
    //     event.preventDefault();
    //     $.ajax({
    //         method: "GET",
    //         url: openWeatherMap_URL,
    //         dataType: "json",
    //         success: function(result, status) {
    //             alert("success");
    //         }
    //     }); // ajax	
    // }); // btnSubmit



}); // ready
