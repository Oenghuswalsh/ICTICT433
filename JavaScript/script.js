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

// Check if the user is already logged in
if (localStorage.getItem("loggedIn") === "true") {
  // If User is already logged in, show user profile
  showUserProfile();
}
// When user clickes on log in button show log in form
loginButton.addEventListener("click", () => {
  showLoginForm();
});

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
  }
});

// Remove username from localstorage when user clicks on log out button
logoutButton.addEventListener("click", () => {
  localStorage.setItem("loggedIn", "false");
  localStorage.removeItem("username", username.value);
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
  // Hide Dashboard
  var columnDashboard = document.querySelector(".column.dashboard");
  if (columnDashboard) {
    columnDashboard.style.display = "none";
  }
  // Hide CRM cards on Project and Staff pages
  var dashboards = document.querySelector(".dashboards");
  if (dashboards) {
    dashboards.style.display = "none";
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
    console.log(username.value);
  }
  // Display Dashboard on home page
  var columnDashboard = document.querySelector(".column.dashboard");
  if (columnDashboard) {
    columnDashboard.style.display = "block";
  }
  // Display CRM cards in Staff and Project pages
  var dashboards = document.querySelector(".dashboards");
  if (dashboards) {
    dashboards.style.display = "inline-block";
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
  window.location.href = "./home.html";
}

// Log out button event listener
logoutButton.addEventListener("click", logout);
