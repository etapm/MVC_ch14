async function fetchPosts() {
  try {
    const response = await fetch("/dashboard");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
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
      `;
    postsContainer.appendChild(postElement);
  }
}

fetchPosts();
