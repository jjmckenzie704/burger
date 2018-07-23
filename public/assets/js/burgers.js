$(".devour").on("click", function(event) {
  var id = $(this).data("id");
  var devour = $(this).data("devoured");

  var devoured = {
    devoured: true
  };
  // Send the PUT request.
  $.ajax("/api/burgers/" + id, {
    type: "PUT",
    data: devoured
  }).then(
    function() {
      // Reload the page to get the updated list
      location.reload();
    }
  );
});

$(".submit").click(function(event) {
  event.preventDefault();
  console.log("Here...")
  console.log($('#newBurger').val());
  if (!$('#newBurger').val() == '') {
    var newBurger = {
      burger_name: $("#newBurger").val().trim(),
      devoured: $("[burger=false]:checked").val()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  } else {
    $('#newBurger').attr('placeholder', 'Error! Please type a burger name!');
  }
});