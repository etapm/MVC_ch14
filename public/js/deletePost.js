const deletePost = async (event) => {
  event.preventDefault();

  const postId = event.target.getAttribute("data-post-id");

  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  const data = await response.json();
  if (response.ok) {
    alert("Post Deleted");
    document.location.replace("/dashboard");
  } else {
    alert("Something went wrong. Can't delete post");
  }
};

document.addEventListener("click", (event) => {
  if (event.target.matches("#delete-post")) {
    deletePost(event);
  }
});
