//clicked on arts and recreation category
$(function(){
	$("#artsRec").click(function() {
		var category = "artsRec";
		findVenues(category);
		})
});

//clicked on food category
$(function(){
	$("#food").click(function() {
		var category = "food";
		findVenues(category);
		})
});

//clicked on nightlife category
$(function(){
	$("#night").click(function() {
		var category = "night";
		findVenues(category);
		})
});

// $(function(){
// 	$("#outdoors").click(function() {
// 		var category = "outdoors";
// 		findVenues(category);
// 		})
// });


//local storage that stores what location the user is currently searching for
//so user doesnt have to retype the same location for each category
localStorage.location = $("#location").val();
console.log("localStorage =",localStorage);


// get venue information from foursquare api depending on which category the user picks
function findVenues(category) {
	var location = $("#location").val();
	if (category =="artsRec"){
		categoryType = "4d4b7104d754a06370d81259";
	}
	else if (category == "food"){
		categoryType = "4d4b7105d754a06374d81259";
	}
	else {
		categoryType = "4d4b7105d754a06376d81259";
	}
	// else{
	// 	categoryType = "4d4b7105d754a06377d81259";
	// }

	var CLIENT_ID = "F1ROPFRWFQZHO1IIACPT2SAFPJIO3ERTUVP3NAI20C1T0Q0G";
	var CLIENT_SECRET = "MSERKPZH1RYR2MVIIH21HNRMZBKKU1THCHKGL2E2S10QBAAP";
	
	//gets what the user entered
	if ($("#location").val()===undefined){
		localStorage.location;
	}
	else{$("#location").val();}
	try {
	$.ajax({
 		url:"https://api.foursquare.com/v2/venues/search?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20151211"+"&near="+location+"&categoryId="+categoryType, //+"&intent=browse", //+"&section="+section,
 		data: {
 			method : "GET",
 			callback : "displayDetails" //jsonp callback
 			},
  		jsonp: false,						
  		dataType: "jsonp",			
		crossDomain: true
		} );
	 return false;
	} catch (e) {console.log(e.description);}
}

function displayDetails(response) {
	var venues = response.response["venues"];
	//didnt get anything from the api
	if (venues === undefined){
		search = "<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span> Your entered location is not valid. Please try again.</div>";
	}
	else{
		//adds venues to a table
		search = "<h4>Search Results: </h4><table class='table'>";

		for (var i=0; i<venues.length;i++){
			var name = venues[i]["name"];
			var address = venues[i]["location"]["formattedAddress"];
			var phone = venues[i]["contact"]["formattedPhone"];
			var lat = venues[i]["location"]["lat"];
			var lng = venues[i]["location"]["lng"];
			var checkinCount = venues[i]["stats"]["checkinsCount"];
			var url = venues[i]["url"];
			var id = venues[i]["id"];

			search += "<tr>";
			search += "<td><button id='moreDetails' type='button' class='btn btn-link' data-toggle='modal' data-target='#myModal'>"+name+"</button></td>"+"<td><button class='addVenue' type='button'><span class='glyphicon glyphicon-star'></span></button></td>";
			search += "<td id='hideDetails'>"+name+"</td><td id='hideDetails'>"+address+"</td><td id='hideDetails'>"+phone+"</td><td id='hideDetails'>"+lat+"</td><td id='hideDetails'>"+lng+"</td><td id='hideDetails'>"+url+"</td>"+"<td id='hideDetails'>"+id+"</td>";
			search += "</tr>";

		}
		search += "</table>"	}
	$("#responseArea").html(search);
}

//adds the favorited venue to database
$(function(){
	$("#responseArea").on("click",".addVenue",function(venue) {
		var name = $(this).parent().next().first().text();
		var address = $(this).parent().next().first().next().text();
		var phone = $(this).parent().next().first().next().next().text();
		var lat = $(this).parent().next().first().next().next().next().text(); 
		var lng = $(this).parent().next().first().next().next().next().next().text(); 
		var url = $(this).parent().next().first().next().next().next().next().next().text()

		var venueData = {};
		venueData.name = name;
		venueData.address = address;
		venueData.phone = phone;
		venueData.lat = lat;
		venueData.lng = lng;
		venueData.url = url;
		
		$.ajax({
	    url:"/venues/",
	    data: venueData,
	    type: "PUT",
	    success: function(result) {
		     console.log("put in database");
	      }
    	});
    	$(this).html('Added');

		});
});

//api call for venue specific details for the venue show modal
$(function(){
	$("#responseArea").on("click","#moreDetails",function(venue){
		var id = $(this).parent().next().next().next().next().next().next().next().next().text();

		$('#myModal').modal({
        show: 'false'
   		 }); 

		var CLIENT_ID = "F1ROPFRWFQZHO1IIACPT2SAFPJIO3ERTUVP3NAI20C1T0Q0G";
		var CLIENT_SECRET = "MSERKPZH1RYR2MVIIH21HNRMZBKKU1THCHKGL2E2S10QBAAP";

		$(this).parent().next().next().next().next().next().next().next().next().text();
		try{
		$.ajax({
 		url:"https://api.foursquare.com/v2/venues/"+id+"?&client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20151211",
 		data: {
 			method : "GET",
 			callback : "venueDetails" //jsonp callback
 			},
  		jsonp: false,						
  		dataType: "jsonp",			
		crossDomain: true
		} );
	 return false;
	} catch (e) {console.log(e.description);}
	});
});

//data returned from the second api call
function venueDetails(response){
	var venue = response.response["venue"];
	var image = venue["canonicalUrl"];
	var name = venue["name"];
	var street = venue["location"]["formattedAddress"][0];
	var state = venue["location"]["formattedAddress"][1];
	var country = venue["location"]["formattedAddress"][2];

	var phone = venue["contact"]["formattedPhone"];
	var rating = venue["rating"];
	if ((venue["popular"] === undefined) & (venue["hours"] === undefined)){

		var open = "Not Available";
	}
	else if (venue["popular"] === undefined){
		if (venue["hours"] !== undefined){
			if(venue["hours"]["isOpen"] ==true)
				var open = "Yes";
			else
				var open = "No";
		}
	}
	else if (venue["hours"] === undefined){
		if (venue["popular"] !== undefined){
			if (venue["popular"]["isOpen"] ==true)
				var open = "Yes";
			else
				var open = "No";
		}
	}
		
	var tags = venue["tags"];
	if (venue["url"] === undefined)
		var url = "Not Available";
	else
		var url = venue["url"];

	$(".modal-title").html(name);
	result = "";
	result += "<table class= table>";
	if (url === "Not Available")
		result += "<tr>Website: "+ url +"</tr><br>"
	else
		result += "<tr>Website: "+"<a href="+url+">"+url+"</a>"+"</tr><br>";
	result += "<tr>Rating: "+rating+"</tr><br>";
	result += "<tr>Open?: "+open+"</tr><br>";
	result += "<tr>Phone Number: "+phone+"</tr><br>";
	result += "<tr id='address'>Address: "+street+"<br>"+state+"<br>"+country+"</tr><br>";
	result += "<tr>Tags: "+tags+"</tr>";
	result += "</table";

	
	//populating the modal with venue specific information
	$(".modal-body p").html(result);

	$('#myModal').modal({
        show: 'true'
    }); 

};
	


