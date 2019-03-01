// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".delquote").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/gigs/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted id ", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
