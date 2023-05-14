document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.getElementsByClassName("delete-post-button");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", async (event) => {
      const id = event.target.getAttribute("data-id");
      try {
        const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
        if (response.ok) {
          window.location.href = "/dashboard";
        } else {
          alert("Failed to delete post");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  const saveChangesButton = document.getElementById("edit-post-form");

  if (saveChangesButton) {
    saveChangesButton.addEventListener("submit", function (event) {
      event.preventDefault();

      const postId = this.getAttribute("data-id");

      const updatedTitle = document.getElementById("post-title").value.trim();
      const updatedContent = document
        .getElementById("post-content")
        .value.trim();

      const updatedPost = {
        title: updatedTitle,
        content: updatedContent,
      };

      fetch("/api/posts/" + postId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      })
        .then(function (response) {
          if (response.ok) {
            window.location.href = "/dashboard";
          } else {
            throw new Error("Error: " + response.statusText);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    });
  } else {
    console.error("Edit post form not found!");
  }
});
