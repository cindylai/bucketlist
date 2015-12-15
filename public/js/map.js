// google maps API key AIzaSyADW0E8rT5v3Aam3qWO2vTr5bzMHEh5NBM

console.log("in maps!");

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.440624, lng: -79.995888},
    zoom: 8
  });

  // var locations = getLocations();
}
 
$(document).ready(function(){
  console.log("in get locations");
  $.ajax({
      url:"/venues",
      type: "GET",
      success: function(result) {
        console.log("result: " + result);
        $("#results").html(result);
         }
      });
});
      

