const loginButton = document.getElementById("login-button");
const loginFormWrapper = document.querySelector(".login-form-wrapper");
const loginBtnContainer = document.querySelector(".loginBtnContainer");
const avatarImg = document.querySelector(".avatarImg");
const columnDashboard = document.querySelector(".column.dashboard");

const submitButton = document.getElementById("submit");
const logInNameContainer = document.querySelector(".userName");
const username = document.getElementById("username");
const logoutButton = document.getElementById("logout-button");
const loginBtn = document.querySelector(".loginBtn");
const logoutBtnContainer = document.querySelector(".logoutBtnContainer");
const dashboards = document.querySelector(".dashboards");
var isLoggedIn = localStorage.getItem("loggedIn");
var pageLoad = null;

// If user is logged in load content for pages from nav icon click
if (isLoggedIn) {
  $("nav a").click(function () {
    var pageLoad = $(this).attr("class");
    loadContent(pageLoad);
  });
  $(document).on("click", "nav a", function () {
    var pageLoad = $(this).attr("class");
    loadContent(pageLoad);
  });
}
// If user is not logged in, clear content and listen for login button click
// otherwise the user is logged in so show the user home page
$(function () {
  if (!isLoggedIn) {
    $("#content").empty();
    loginButton.addEventListener("click", () => {
      showLoginForm();
    });
  } else {
    showUserProfile();
  }
});
// If the address bar has a HASH value, retrive that value, remove the HASH and save it as a reloadContent variable
// use that reLoadContent to refrenh the page when refresh is clicked
if (window.location.hash && isLoggedIn) {
  var reloadContent = window.location.hash.substring(1);

  $("#content").load("content/" + reloadContent + ".html");
}

function loadContent(pageLoad) {
  $("#content").load("content/" + pageLoad + ".html");
}

// Display log in form
function showLoginForm() {
  var loginFormWrapper = document.querySelector(".login-form-wrapper");
  if (loginFormWrapper) {
    loginFormWrapper.style.display = "block";
  }
}

// Store username in localstorage when submit button is clicked
submitButton.addEventListener("click", (event) => {
  if (event.target) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username.value);
    showUserProfile();
    loadContent("home");
    $("nav a").click(function () {
      var pageLoad = $(this).attr("class");
      loadContent(pageLoad);
    });
    $(document).on("click", "nav a", function () {
      var pageLoad = $(this).attr("class");
      loadContent(pageLoad);
      console.log(pageLoad);
    });
  }
});

// Remove username from localstorage when user clicks on log out button
logoutButton.addEventListener("click", () => {
  localStorage.setItem("loggedIn", "false");
  localStorage.removeItem("username", username.value);
  $("#content").empty();
  showHome();
});

// Return user to home page when log out button is clicked
// Hide log out button
function showHome() {
  var logoutBtnContainer = document.querySelector(".logoutBtnContainer");
  if (logoutBtnContainer) {
    logoutBtnContainer.style.display = "none";
  }
  // Display log in button
  var loginBtn = document.querySelector(".loginBtn");
  if (loginBtn) {
    loginBtn.style.display = "flex";
  }

  // Hide user name
  var logInNameContainer = document.querySelector(".userName");
  if (logInNameContainer) {
    logInNameContainer.textContent = "";
  }
  // Hide users avatar image icon
  var avatarImg = document.querySelector(".avatarImg");
  if (avatarImg) {
    avatarImg.src = `/Icons/user-96.png`;
  }
}

// hide log in form when log in button on log in form is clicked
function showUserProfile() {
  var loginFormWrapper = document.querySelector(".login-form-wrapper");
  if (loginFormWrapper) {
    loginFormWrapper.style.display = "none";
  }
  // Display log out button
  var logoutBtnContainer = document.querySelector(".logoutBtnContainer");
  if (logoutBtnContainer) {
    logoutBtnContainer.style.display = "flex";
  }

  // Hide log in button
  var loginBtn = document.querySelector(".loginBtn");
  if (loginBtn) {
    loginBtn.style.display = "none";
  }
  // Display users avatar image icon
  var avatarImg = document.querySelector(".avatarImg");
  if (avatarImg) {
    avatarImg.src = `/Icons/active-user-96.png`;
  }
  // Display username on header
  var logInNameContainer = document.querySelector(".userName");
  if (logInNameContainer) {
    logInNameContainer.textContent = username.value;
  }
}
// Show username on page load if user is logged in
window.addEventListener("load", () => {
  if (localStorage.getItem("loggedIn") === "true") {
    const logInNameContainer = document.querySelector(".userName");
    const username = localStorage.getItem("username");
    if (logInNameContainer && username) {
      logInNameContainer.textContent = username;
    }
  }
});
// Remove username from local storage if user is not logged in
if (localStorage.getItem("loggedIn") !== "true") {
  localStorage.removeItem("username");
}

// Log out function
function logout() {
  // Remove logged in state and username from local storage
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("username");

  // Redirect to login page
  window.location.href = "./index.html";
}

// Log out button event listener
logoutButton.addEventListener("click", logout);
