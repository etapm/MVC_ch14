document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("add-comment-form");
  if (!commentForm) {
    console.log("Comment form not found");
    return;
  }

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const contentElement = document.getElementById("comment-content");
    const content = contentElement ? contentElement.value.trim() : null;
    if (!content) {
      console.log("No content found");
      return;
    }

    const postId = commentForm.dataset.id;
    if (!postId) {
      console.log("No post ID found");
      return;
    }

    console.log(`Submitting comment '${content}' for post '${postId}'`);

    fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          alert("Failed to submit comment");
        }
      })
      .catch((err) => console.error(err));
  });
});
