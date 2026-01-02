// // Welcome message
// let userName = prompt("What is your name?");
// if (!userName) {
//   alert("Welcome!");
// } else {
//   alert("Welcome " + userName);
// }

// Mobile menu
const hamburger = document.getElementById("hamburger");
const closeIcon = document.getElementById("close-icon");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.add("active");
  hamburger.style.display = "none";
  closeIcon.style.display = "block";
});

closeIcon.addEventListener("click", () => {
  navbar.classList.remove("active");
  hamburger.style.display = "block";
  closeIcon.style.display = "none";
});

// Dark mode
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

moonIcon.style.display = "none";

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (sunIcon.style.display === "none") {
    sunIcon.style.display = "inline";
    moonIcon.style.display = "none";
  } else {
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline";
  }
});

