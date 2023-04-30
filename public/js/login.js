const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-input").value.trim();
  const password = document.querySelector("#password-input").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Login response:", response);

    const responseBody = await response.json();
    console.log("Response body:", responseBody);

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  } else {
    alert("Please enter a username and password.");
  }
};

const redirectCreate = (event) => {
  event.preventDefault();

  document.location.replace("/signup");
};

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", loginFormHandler);

const createAccountBtn = document.querySelector("#create-account-btn");
createAccountBtn.addEventListener("click", redirectCreate);

console.log("Login script loaded");
