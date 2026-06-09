// Loading Screen

window.addEventListener("load", () => {
  document.querySelector(".loader-wrapper").style.display = "none";
});

// Typing Effect

const words = [
  "PHP Developer",
  "Laravel Developer",
  "CodeIgniter Developer",
  "Backend Engineer",
  "API Developer",
];

let wordIndex = 0;

setInterval(() => {
  document.getElementById("typing").innerHTML = words[wordIndex];

  wordIndex++;

  if (wordIndex >= words.length) {
    wordIndex = 0;
  }
}, 2000);
// Top Button

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.onclick = () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
};

// Active Menu

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.href.includes(current)) {
      link.classList.add("active");
    }
  });
});

// Theme Toggle
const body = document.body;

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");

    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  } else {
    localStorage.setItem("theme", "dark");

    themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
  }
});
