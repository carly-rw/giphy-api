$(document).ready(function() {

var topics = ['beach', 'smoke', 'stars', 'lava', 'comet', 'moon', 'sun', 'coral', 'trees', 'grass', 'flowers', 'sky', 'clouds', 'dirt'];

function displayGifs() {
	$("#gifDump").empty();
	var gif = $(this).data("name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=12&rating=&api_key=dc6zaTOxFJmzC"

	$.ajax({url: queryURL, method: "GET"}).done(function(response) {

		console.log(response);

		var results = response.data;

		for (var i= 0; i < results.length; i++) {
			var gifDiv = $("<div class=item></div>");
			var rating = results[i].rating;
			var p = $("<p>").text("Rating: " + rating);
			p.addClass("calmerFont");
			var gifImage = $("<img>"); 
			gifImage.attr("src", results[i].images.fixed_height_still.url);
			gifImage.attr("data-still", results[i].images.fixed_height_still.url);
			gifImage.attr("data-animate", results[i].images.fixed_height.url);
			gifImage.attr("data-state", "still");
			gifImage.addClass("gifImage");
			gifDiv.append(gifImage);
			gifDiv.append(p);
			
		$("#gifDump").prepend(gifDiv);
	}

	})

}  

$(document).on('click', '.gifImage', function(){
	console.log("This worked");

var state = $(this).attr("data-state");

            if (state == "still") {
                $(this).attr("src", $(this).data('animate'));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).data('still'));
                $(this).attr("data-state", "still");
            };
         });


function renderButtons() {
	$('#gifButtons').empty();

	for (var i=0; i < topics.length; i++) {
		var a = $("<button>")
		a.addClass('gif');
		a.addClass('btn');
		a.addClass('btn-default');
		a.addClass('calmerFont');
		a.attr('data-name', topics[i]);
		a.text(topics[i]);
		$("#gifButtons").append(a);
	}
}

$('#addGif').on('click', function() {

	var gifSet = $('#gif-input').val().trim();

	if (!topics.includes(gifSet) && gifSet.length > 2) {
	topics.push(gifSet);
	} else {
		alert("Get yourself a brand new one, babe. It's on me.");
	};

	renderButtons();
	return false; 

	});

$(document).on("click", ".gif", displayGifs);

renderButtons();

});

