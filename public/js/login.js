document.addEventListener("DOMContentLoaded", () => {
  //pagina de login sa salvez in localstorage
  console.log("DOM fully loaded");

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    console.log("Login form found");
    loginForm.addEventListener("submit", function (event) {
      console.log("Login form submitted");
      const loginUsernameInput = document.getElementById("loginUsernameInput");
      const username = loginUsernameInput.value;
      console.log("Saving username to local storage...");
      localStorage.setItem("username", username);
    });
  } else {
    console.log("Login form not found");
  }

  const loginUsernameInput = document.getElementById("loginUsernameInput");
  const storedUsername = localStorage.getItem("username");

  if (storedUsername) {
    console.log("Username found in local storage");
    loginUsernameInput.value = storedUsername;
  } else {
    console.log("Username not found in local storage");
  }
});
