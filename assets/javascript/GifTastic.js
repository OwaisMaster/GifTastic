var topics = ['Dog Memes', 'Cars', 'Drones', 'Programmer Memes', 'Cats', 'Street Racing',];

function loadButtons() {
    //Removes eveything in div with Buttons id
    $('#Buttons').text('');
    //Loop to create the buttons
    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i];
        //Adds button with id and click event to #Buttons div
        $('#Buttons').append("<button id=\"GifButton" + i + "\" onclick=\"Click('" + topic + "');\">" + topic + "</button>");
    
    }
}

function Click(query) {
    //Stores api url and key into a variable
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&rating=pg&limit=10&api_key=AQOhjKbIawpCRCsZRM98vOPXdhdrTr6U";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //Stores data from response into results variable
        var results = response.data;
        //Checks if there are any gifs
        if (results.length === 0) {
            alert("There are no results for this search!");
            return;
        }
        //Loop to display each result
        for (var i = 0; i < results.length; i++) {
            //Creates a new div with gif class
            var gifDiv = $("<div class='gif'>");
            //Stores rating in a new paragraph
            var rating = $('<p>').text('Rating: ' + results[i].rating.toUpperCase());
            //Stores title in a new paragraph
            var title = $('<p>').text('Title: ' + results[i].title);
            //Stores still url of still image 
            var url = results[i].images.fixed_height_still.url;
            //Creates new image tag 
            var gif = $('<img>');
            //Adds the source attribute with the still url
            gif.attr('src', url);
            //Adds the still url to the data-still attribute
            gif.attr('data-still', results[i].images.fixed_height_still.url);
            //Adds the animated url to the data-animate attribute
            gif.attr('data-animate', results[i].images.fixed_height.url);
            //Sets the data-state to still
            gif.attr('data-state', 'still');
            //Adds a class
            gif.addClass('gifImage');
            //Appends the rating, title, and gif to the new Div
            gifDiv.append(rating);
            gifDiv.append(title);
            gifDiv.append(gif);
            //Appends the new Div under the Gifs div
            $('#Gifs').prepend(gifDiv);
        }
    })
}
//The function called when the gif image is clicked
function checkState() {
    //Stores the state of the gif 
    var state = $(this).attr('data-state');
    //If the state is still 
    if (state === "still") {
        //the src is changed to the url of the data-animate attribute
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        //the src is changed to the url of the data-still attribute
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
}

//When the gif image is clicked on the checkState function is called
$(document).on("click",".gifImage", checkState);
//When the add button is clicked it will run this function
$(document).on('click', "#add-button", function(event) {
    event.preventDefault();
    //Stores the button created by the user
    var button = $('#input').val().trim();
    //Checks it isn't empty
    if (button == '') {
        alert("It cannot be empty!");
        return;
    }
    //Adds to the topics array
    topics.push(button);
    //Reloads the buttons to show the new one
    loadButtons();
});