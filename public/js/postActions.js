$(document).ready(function () {
  $("#edit-post").on("click", function () {
    var postId = $(this).data("post-id");
    window.location.href = "/dashboard/edit/" + postId;
  });

  $("#delete-post").on("click", function () {
    var postId = $(this).data("post-id");
    if (confirm("Are you sure you want to delete this post?")) {
      $.ajax({
        url: "/dashboard/delete/" + postId,
        type: "DELETE",
        success: function (result) {
          window.location.reload();
        },
        error: function (err) {
          alert("An error occurred while deleting the post.");
        },
      });
    }
  });
});
