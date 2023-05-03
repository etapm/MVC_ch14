const logout = async (event) => {
  event.preventDefault();
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert("Uh-oh, something went wrong");
  }
};

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  document.querySelector("#logout").addEventListener("click", logout);
  console.log("Logout button clicked");
});
