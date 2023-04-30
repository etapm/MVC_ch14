const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-input").value.trim();
  const email = document.querySelector("#email-input").value.trim();
  const password = document.querySelector("#password-input").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const responseBody = await response.json();
    console.log("Response body:", responseBody);

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to sign up.");
    }
  } else {
    alert("Please enter a username, email, and password.");
  }
};

document
  .querySelector(".new-user-div")
  .addEventListener("submit", signupFormHandler);
