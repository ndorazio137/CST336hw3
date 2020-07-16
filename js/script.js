$(document).ready(function() {

    var KEY = "e67228b54203e43fbc22d0372e379cb7";


    var mapACCESS_TOKEN = "pk.eyJ1IjoibmRvcmEiLCJhIjoiY2tjb2VsMXJzMDliejJwcXp0aHEydWRtOCJ9.twYKoy8TNL8DKLX2H8Dt7Q";
    var mapboxAPI_URL = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapACCESS_TOKEN}`;
    var attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

    var mymap = L.map('mapid').setView([51.505, -0.09], 13); /*params (latitude, longitude, Zoom level) */

    var tiles = L.tileLayer(mapboxAPI_URL, {
        attribution: attribution,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapACCESS_TOKEN
    })
    
    tiles.addTo(mymap);



    var clouds = L.OWM.clouds({ appId: KEY });
    var cloudscls = L.OWM.cloudsClassic({ appId: KEY });
    var precipitation = L.OWM.precipitation({ appId: KEY });
    var precipitationcls = L.OWM.precipitationClassic({ appId: KEY });
    var rain = L.OWM.rain({ appId: KEY });
    var raincls = L.OWM.rainClassic({ appId: KEY });
    var snow = L.OWM.snow({ appId: KEY });
    var pressure = L.OWM.pressure({ appId: KEY });
    var pressurecntr = L.OWM.pressureContour({ appId: KEY });
    var temp = L.OWM.temperature({ appId: KEY });
    var wind = L.OWM.wind({ appId: KEY });

    $("#btnSubmit").on("click", function(event) {
        event.preventDefault();
        $.ajax({
            method: "GET",
            url: `http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?
opacity=0.9&fill_bound=true&appid=${KEY}`,
            dataType: "json",
            success: function(result, status) {
                document.getElementById("return").innerHTML = result;
            }
        }); // ajax	
    }); // btnSubmit


    //$.get("https://www.api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e67228b54203e43fbc22d0372e379cb7", function(result, status) {
    //    alert(result);
    //});
}); // ready
