$(function() {   // when document is ready
	$("#form").submit(findVenues);
	});


function findVenues() {
	// takes the movie input
	console.log("IN HERE!");
	var location = $("#enterLocation").val();
	console.log(location);
	var CLIENT_ID = "F1ROPFRWFQZHO1IIACPT2SAFPJIO3ERTUVP3NAI20C1T0Q0G";
	var CLIENT_SECRET = "MSERKPZH1RYR2MVIIH21HNRMZBKKU1THCHKGL2E2S10QBAAP";

	var today = new Date();
	console.log("today=",today);
	var dd = today.getDate()+"";
	var mm = today.getMonth()+1+"";
	var yyyy = today.getFullYear()+"";
	var date = yyyy+mm+dd;
	console.log("Date=",date);

	//var section = "topPicks";
	
	//gets what the user entered
	$("#enterLocation").val("");
	try {
	$.ajax({
 		//url:"https://api.foursquare.com/v2/venues/search?intent=browse&nearll=40.7,-74&client_id="+clientId+"&client_secret="+clientSecret+"&v="+date,
 		url:"https://api.foursquare.com/v2/venues/explore?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20151206"+"&near="+location+"&intent=browse", //+"&section="+section,
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
	console.log("response=",response);
	console.log("venues=",response.response["venues"]);
	var venues = response.response["venues"];
	//console.log("length=",venues.length);
	// for (var i=0; venues.length; i++){
	// 	//console.log(i, venues[i]);
	// 	$("responseArea ul").append("<li>"+venues[i]+"</li>");
	// }
	
	}



