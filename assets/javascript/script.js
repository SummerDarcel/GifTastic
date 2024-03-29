$(document).ready(function(){

    var topics = ["Wonder Woman", "Jean Grey", "Gamora","Spider-Woman","She-Hulk", "Scarlet Witch", "Shuri", "Captain Marvel"];

    var button;
    var newTopic = "";
    
    // function to create new buttons from the topics 
    var buttonGenerator = function () {
        // the previous div elements are emptied 
        $("#buttonRow").empty();
        // loops through the array and creates buttons
        for (i = 0; i < topics.length; i++) {
            button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-primary").attr("data", topics[i]);
            $("#buttonRow").append(button);
        };
    }
     
    $("#buttonRow").on("click", ".btn", function () {
        var x = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=ckGenMACE4Dr3cG09lAn2VXkWYWOE5qb&limit=10";
    
        $.ajax({
            url: queryURL,
            method: "GET"
    
        }).then(function (response) {
            console.log(response);
    
            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
                // a div is created to hold a gif of any topic
                var topicDiv = $("<div>");
                    var p = $("<p>");
                p.text(results[i].rating);
                var p = $("<p>").text("Rating: " + results[i].rating);
    
                var topicImage = $("<img>").addClass("border");
    
                // add states of animate and still which will be toggled 
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-state", "still");
                topicImage.addClass("gif");
    
                // image is appended to the div
                topicDiv.append(topicImage);
                // rating is appended to the div below the gif
                topicDiv.append(p);
                //new images 
                $("#gifArea").prepend(topicDiv);
            }
        })
    })
    
    // Stop giffyTime Start giffyTime
    $("#gifArea").on("click", ".gif", function (event) {
        event.preventDefault();
    
        // state of clicked gif
        var state = $(this).attr("data-state");
    
        // according to the current state gifs toggle between animate and still 
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
    
    $(".submit").on("click", function (event) {
        event.preventDefault();
    
        console.log("submit");
        // sets inputted value to newTopic 
        newTopic = $("#searchArea").val();
        // new topic is added to the topics array 
        topics.push(newTopic);
        console.log(topics);
        // call the function that creates the new button
        buttonGenerator();
    });

    buttonGenerator()})