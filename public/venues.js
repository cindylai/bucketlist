$(function() {   // when document is ready
	$("#form").submit(findVenues);
	});

	

function findVenues() {

	var location = $("#enterLocation").val();
	// var category = $("category").val();
	
	var category = $("#category option:selected").val();
	console.log("CATEGORY=", category)

	if (category =="artsRec"){
		console.log("its arts and rec");
		categoryType = "4d4b7104d754a06370d81259";
	}
	else if (category == "food"){
		console.log("its food!");
		categoryType = "4d4b7105d754a06374d81259";
	}
	else if (category == "night"){
		console.log("its night");
		categoryType = "4d4b7105d754a06376d81259";
	}
	else{
		console.log("its outdoors!");
		categoryType = "4d4b7105d754a06377d81259";
	}

	var CLIENT_ID = "F1ROPFRWFQZHO1IIACPT2SAFPJIO3ERTUVP3NAI20C1T0Q0G";
	var CLIENT_SECRET = "MSERKPZH1RYR2MVIIH21HNRMZBKKU1THCHKGL2E2S10QBAAP";

	// var today = new Date();
	// console.log("today=",today);
	// var dd = today.getDate()+"";
	// var mm = today.getMonth()+1+"";
	// var yyyy = today.getFullYear()+"";
	// var date = yyyy+mm+dd;
	// console.log("Date=",date);

//4d4b7104d754a06370d81259 Arts and Entertainment
	//4d4b7105d754a06374d81259 Food
	//4d4b7105d754a06377d81259 Outdoors and Recreation
	//4d4b7105d754a06376d81259 Nightlife
	
	
	//gets what the user entered
	$("#enterLocation").val("");
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

	for (var i=0; i<venues.length; i++){
		var temp = "<tr><td>"+venues[i]["name"]+"</td>"+"<td>"+venues[i]["location"]["formattedAddress"]+"</td>"+"</tr>"+"</br>";
		$("#responseArea table").append(temp);
	}
	
	}



