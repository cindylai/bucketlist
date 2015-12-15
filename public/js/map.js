// google maps API key AIzaSyADW0E8rT5v3Aam3qWO2vTr5bzMHEh5NBM


// incorporating google maps
// FUTURE IMPLEMENTATION: adding all the markers to the map
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.440624, lng: -79.995888},
    zoom: 8
  });

}
 
//retrieving all favorited venues in the database
$(document).ready(function(){
  console.log("in get locations");
  $.ajax({
      url:"/venues",
      type: "GET",
      success: function(result) {
        $("#results").html(result);
         }
      });
});




