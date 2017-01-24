/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var geocoder;
var cityname,countryname;
var footer;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
	
} 
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

  function initialize() {
    geocoder = new google.maps.Geocoder();



  }

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
      
        if (results[1]) {
         //formatted address
         //alert(results[0].formatted_address);
        //find country name
        
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] === "country") {
                    //this is the object you are looking for
                    countryname= results[0].address_components[i];
                    break;
                }
				if (results[0].address_components[i].types[b] === "locality") {
                    //this is the object you are looking for
                    cityname= results[0].address_components[i].long_name;
                    break;
                }
            }
        }
        //city data
		
        //alert(cityname + " "+ countryname.long_name)
	footer = document.getElementById('footertext');
	footer.innerHTML =cityname + " ," +countryname.long_name;

        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }