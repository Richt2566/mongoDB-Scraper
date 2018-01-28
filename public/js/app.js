// $( document ).ready(function() {
//     $(".article-area").hide();

// });

// $(".hide-articles").on("click",function(){
// 	$(".article-area").toggle();
// })

$(".scrape-btn").on("click", function(){

	//getArticles();

  $.getJSON("/articles", function(data) {
    // For each one
    for (var i = 800; i < data.length; i++) {
      // Display the apropos information on the page
      $(".article-area").append("<div class='save'><p data-id='" + data[i]._id + "'>" + data[i].title + "</p><p><a href=" + data[i].link +">" + data[i].link + "'</a></p><button id='save-btn'>save</button></div>");
      
    }
  });

});

$("#save-btn").on("click", function(){

  //$(".save").hide();
  console.log("saved");

});

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  //$("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);

      // The title of the article
      // $("#notes").append("<h2>" + data.title + "</h2>");
      // // An input to enter a new title
      // $("#notes").append("<input id='titleinput' name='title' >");
      // // A textarea to add a new note body
      // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // // A button to submit a new note, with the id of the article saved to it
      // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      // $("#notes").append("<button data-id='" + data._id + "' id='removenote'>Remove Note</button>");
      // // If there's a note in the article
      // if (data.note) {
      //   // Place the title of the note in the title input
      //   $("#titleinput").val(data.note.title);
      //   // Place the body of the note in the body textarea
      //   $("#bodyinput").val(data.note.body);
      // }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When you click the remove note button
$(document).on("click", "#removenote", function() {
  // Grab the id associated with the article from the submit button

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// function getArticles() {
//   $.getJSON("/articles", function(data) {
//     for (var i = 0; i < 20; i++) {
//       $(".article-area").append('<p>' + data[i].title + '</p>');
//     console.log(data[i].title);
//     }
//     //$(".article-area").prepend("<tr><th>Titad</th></tr>");
//   	// console.log(data[0].title);
//   });
// }