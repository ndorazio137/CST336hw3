$(document).ready(function() {

    // /* Global openWeatherMap API variables */
    // var openWeatherMap_URL = "https://api.openweathermap.org/data/2.5/onecall";
    // var openWeatherMap_KEY = "e67228b54203e43fbc22d0372e379cb7";

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
    var state;
    var countryName;
    var countryCode;
    var country;
    var continent;
    var currency;
    var currencyName;
    var currencySymbol;

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

    map.on('click', onMapClick);

    function isFormValid() {
        $("#validationFdbk").html(""); //resets validation feedback

        let isValid = true;
        if ($("#city").val() == "") {
            isValid = false;
            $("#validationFdbk").html("Please enter a city");
            $("validationFdbk").attr("class", "bg-warning text-white");
        }

        return isValid;
    }

    $("#form").on("submit", function(e) {
        e.preventDefault();
        isFormValid();
        
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
                popup.setLatLng(latlng);
                map.panTo(latlng);
                setPopUp(result);
                map.openPopup(popup);

            }
        }); //ajax
    });

    function onMapClick(e) {
        latitude = e.latlng.lat;
        longitude = e.latlng.lng;
        latlng = L.latLng(latitude, longitude);
        
        $.ajax({
            method: "GET",
            url: openCageData_URL,
            dataType: "json",
            data: {
                q: latitude + longitude,
                key: openCageData_KEY
            },
            success: function(result, status) {
                popup.setLatLng(latlng);
                setPopUp(result);
                map.openPopup(popup);
            }
        }); //ajax
    }

    function setPopUp(result) {
        city = result.features[0].properties.components.city;
        state = result.features[0].properties.components.state;
        countryName = result.features[0].properties.components.country;
        countryCode = result.features[0].properties.components.country_code;
        country = countryName + " (" + countryCode.toUpperCase() + ")";
        continent = result.features[0].properties.components.continent;
        currencyName = result.features[0].properties.annotations.currency.name;
        currencySymbol = result.features[0].properties.annotations.currency.symbol;
        currency = currencyName + " (" + currencySymbol + ")";

        document.getElementById("state").innerHTML = state;
        document.getElementById("country").innerHTML = country;
        document.getElementById("continent").innerHTML = continent;
        document.getElementById("latitude").innerHTML = latitude.toString();
        document.getElementById("longitude").innerHTML = longitude.toString();
        document.getElementById("currency").innerHTML = currency;

        popup.setContent("<strong>City:</strong> " + city +
            "<br /><strong>State:</strong> " + state +
            "<br /><strong>Country:</strong> " + country +
            "<br /><strong>Continent:</strong> " + continent +
            "<br /><strong>Latitude:</strong> " + latitude +
            "<br /><strong>Longitude:</strong> " + longitude +
            "<br /><strong>Currency:</strong> " + currency);
    }
}); // ready
