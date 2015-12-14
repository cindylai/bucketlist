$(function(){
	$("#artsRec").click(function() {
		var category = "artsRec";
		findVenues(category);
		})
});

$(function(){
	$("#food").click(function() {
		var category = "food";
		findVenues(category);
		})
});

$(function(){
	$("#night").click(function() {
		var category = "night";
		findVenues(category);
		})
});

$(function(){
	$("#outdoors").click(function() {
		var category = "outdoors";
		findVenues(category);
		})
});

$(function () {
  $('[data-toggle="popover"]').popover()
});

localStorage.location = $("#location").val();
console.log("localStorage =",localStorage);



function findVenues(category) {

	var location = $("#location").val();
	// var category = $("category").val();
	console.log("location=",location);
	//var category = $("#category option:selected").val();
	console.log("CATEGORY=", category)

	if (category =="artsRec"){
		categoryType = "4d4b7104d754a06370d81259";
	}
	else if (category == "food"){
		categoryType = "4d4b7105d754a06374d81259";
	}
	else if (category == "night"){
		categoryType = "4d4b7105d754a06376d81259";
	}
	else{
		categoryType = "4d4b7105d754a06377d81259";
	}

	var CLIENT_ID = "F1ROPFRWFQZHO1IIACPT2SAFPJIO3ERTUVP3NAI20C1T0Q0G";
	var CLIENT_SECRET = "MSERKPZH1RYR2MVIIH21HNRMZBKKU1THCHKGL2E2S10QBAAP";
	
	//gets what the user entered
	if ($("#location").val()===undefined){
		localStorage.location;
	}
	else{$("#location").val();}
	// $("#location").val();
	try {
	$.ajax({
 		//url:"https://api.foursquare.com/v2/venues/explore?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20151206"+"&near="+location, //+"&intent=browse", //+"&section="+section,
 		url:"https://api.foursquare.com/v2/venues/search?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20151211"+"&near="+location+"&categoryId="+categoryType, //+"&intent=browse", //+"&section="+section,
 		//url: "https://api.foursquare.com/v2/venues/explore?near="+location+"&section=coffee"+"&client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET,
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
	$("#responseArea table").empty();
	console.log("response=",response);
	console.log("venues=",response.response["venues"]);
	var venues = response.response["venues"];
	if (venues === undefined){
		//search = "<p>Your search did not match any location. Please try again.</p>";
		search = "<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span> Your entered location is not valid. Please try again.</div>";
	}
	else{
		search = "<h4>Search Results: </h4><table class='table'>";

		for (var i=0; i<venues.length;i++){
			var name = venues[i]["name"];
			var address = venues[i]["location"]["formattedAddress"];
			var phone = venues[i]["contact"]["formattedPhone"];
			var lat = venues[i]["location"]["lat"];
			var lng = venues[i]["location"]["lng"];
			var checkinCount = venues[i]["stats"]["checkinsCount"];
			var url = venues[i]["url"];

			search += "<tr>";
			//search += "<td>"+"<button id='moreDetails' type='button' class='btn btn-link'>"+name+"</button>"+"</td><td><button class='add_venue' type='button'><span class='glyphicon glyphicon-plus'></span></button></td>";
			search += "<td><button id='moreDetails' type='button' class='btn btn-link'>"+name+"</button></td>"+"<td><button class='addVenue' type='button'><span class='glyphicon glyphicon-plus'></span></button></td>";

			// search += "<td><table class='table id='hideDetails'><tr>"+name+'</tr><tr>'+address+'</tr><tr>'+phone+'</tr><tr>'+lat+'</tr><tr>'+lng+'</tr><tr>'+url+"</tr></table></td>";
			search += "<td id='hideDetails'>"+name+"</td><td id='hideDetails'>"+address+"</td><td id='hideDetails'>"+phone+"</td><td id='hideDetails'>"+lat+"</td><td id='hideDetails'>"+lng+"</td><td id='hideDetails'>"+url+"</td>";

			search += "</tr>";
			
	
		}
		search += "</table>"	}
	$("#responseArea").html(search);
}



$(function(){
	$("#responseArea").on("click",".addVenue",function(venue) {
		
		//console.log('venue=',venue);
		//console.log('hi,',$(this).parent().next().firstChild());
		//console.log('2',$(this).parent().parent().parent().parent().parent());
		//console.log("hello",$(this).parent().parent().next());
		//console.log("3",$(this).parent().next().children().text());
		console.log('hello',$(this).parent().parent().next());
		console.log('hi',$(this).parent().next().first().text());
		console.log('heyyy',$(this).parent().next().first().next().text());
		
		var venueData = {};
		
		// $.ajax({
	 //    url:"/venues/",
	 //    data: venueData,
	 //    type: "PUT",
	 //    success: function(result) {
		//      console.log("put in database");
	 //      }
  //   	});


		});
});

// $(function(){
// 	$("#addPlayerForm").submit(function(e){
// 		e.preventDefault();
// 		var name = $("#playername").val();
// 		var age = $("#age").val();
// 		var country = $("#country").val();
// 		var rank = $("#rank").val();
// 		$.ajax({
// 	    url:'venue?name='+name+'&address='+address+'&phone='+phone+'&lat='+lat+'&lng='+lng+'&url='+url,
// 	    type: "PUT",
// 	    success: function(result) {
// 		      var temp = "<tr>"+"<td>"+result["playername"]+"</td>"+"<td>"+result["age"]+"</td>"+"<td>"+result["country"]+"</td>"+"<td>"+result["rank"]+"</td>";
// 		      $("#responseArea1 table").append(temp);
// 	      }
//     	});
// 	});
// });
// var name = venues[i]["name"];
// 			var address = venues[i]["location"]["formattedAddress"];
// 			var phone = venues[i]["contact"]["formattedPhone"];
// 			var lat = venues[i]["location"]["lat"];
// 			var lng = venues[i]["location"]["lng"];
// 			var checkinCount = venues[i]["stats"]["checkinsCount"];
// 			var url = venues[i]["url"];

// 'venue?name='+name+'&address='+address+'&phone='+phone+'&lat='+lat+'&lng='+lng+'&url='+url



