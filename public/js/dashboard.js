document.addEventListener("DOMContentLoaded", () => {
  const createPostForm = document.getElementById("create-post-form");
  if (createPostForm) {
    createPostForm.addEventListener("submit", handleFormSubmit);
  }
});

async function handleFormSubmit(event) {
  event.preventDefault();

  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error("Failed to create a new post");
    }

    const data = await response.json();
    console.log("Post created:", data);
    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchPosts() {
  try {
    const response = await fetch("/api/dashboard/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    console.log("Fetched posts:", data);
    renderPosts(data);
  } catch (err) {
    console.error(err);
  }
}

function renderPosts(posts) {
  const postsContainer = document.querySelector("#posts-container");
  postsContainer.innerHTML = "";

  for (const post of posts) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button class="edit-btn" data-id="${post.id}">Edit</button>
        <button class="delete-btn" data-id="${post.id}">Delete</button>
        <div class="comments">
          <h3>Comments</h3>
          <ul class="comment-list" data-id="${post.id}"></ul>
          <form class="add-comment-form" data-id="${post.id}">
            <input type="text" class="comment-input" placeholder="Add a comment..." required>
            <button type="submit">Comment</button>
          </form>
        </div>
      `;
    console.log("Rendered post element:", postElement);
    postsContainer.appendChild(postElement);
  }

  document
    .querySelectorAll(".edit-btn")
    .forEach((btn) => btn.addEventListener("click", handleEditClick));
  document
    .querySelectorAll(".delete-btn")
    .forEach((btn) => btn.addEventListener("click", handleDeleteClick));
  document
    .querySelectorAll(".add-comment-form")
    .forEach((form) => form.addEventListener("submit", handleCommentSubmit));
}

async function handleEditClick(event) {
  const postId = event.target.dataset.id;

  const newTitle = prompt("Enter a new title");
  const newContent = prompt("Enter new content");

  if (!newTitle.trim() || !newContent.trim()) {
    alert("Title and content cannot be empty");
    return;
  }

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });

    if (!response.ok) {
      throw new Error("Failed to update the post");
    }

    console.log("Post updated:", postId);
    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function handleDeleteClick(event) {
  const postId = event.target.dataset.id;

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the post");
    }

    console.log("Post deleted:", postId);
    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function handleCommentSubmit(event) {
  event.preventDefault();

  const postId = event.target.dataset.id;
  const commentInput = event.target.querySelector(".comment-input");
  const comment = commentInput.value.trim();

  if (!comment) {
    alert("Comment cannot be empty");
    return;
  }

  try {
    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment }),
    });

    if (!response.ok) {
      throw new Error("Failed to add a comment");
    }

    console.log("Comment added:", postId);
    commentInput.value = "";
    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchPosts();
