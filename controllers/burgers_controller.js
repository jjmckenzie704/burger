// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".devour").on("click", function(event) {
      var id = $(this).data("id");
      var devour = $(this).data("devoured");
      console.log(devour)
  
      var devoured = {
        devoured: true
      };
      console.log(devoured)
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: devoured
      }).then(
        function() {
          console.log("burger devoured", devoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".submit").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
        console.log(this)
      var newBurger = {
        burger_name: $("#newBurger").val().trim(),
        devoured: $("[burger=false]:checked").val()
      };
      //console.log(this)
  
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
    });
  
  });
  