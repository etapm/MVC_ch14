// login.js

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

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

const redirectCreate = (event) => {
  event.preventDefault();

  document.location.replace("/create-account");
};

// Select the login form element and add an event listener for when it is submitted
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", loginFormHandler);

// Select the login submit button and add an event listener for when it is clicked
const loginSubmitBtn = document.querySelector("#login-submit-btn");
loginSubmitBtn.addEventListener("click", loginFormHandler);

// Select the create account button and add an event listener for when it is clicked
const createAccountBtn = document.querySelector("#create-account-btn");
createAccountBtn.addEventListener("click", redirectCreate);
