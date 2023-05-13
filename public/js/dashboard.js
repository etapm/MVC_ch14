document.querySelectorAll(".delete-post-button").forEach((button) => {
  button.addEventListener("click", async (event) => {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });

    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Failed to delete post");
    }
  });
});
