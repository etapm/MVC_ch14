const editPostHandler = async (event) => {
  event.preventDefault();

  const postId = event.target.getAttribute("data-post-id");
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post.");
    }
  }
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editPostHandler);
