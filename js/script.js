const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const height = window.innerHeight;
        if (top < height - 100) {
            el.classList.add("active");
        }
    });
});
// Header shrink on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");

  if (!header) return;

  if (window.scrollY > 60) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
    // Product accordion
document.querySelectorAll(".product-header").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");
  });
});

// Product search filter
const searchInput = document.getElementById("productSearch");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll(".product-item").forEach(item => {
      const text = item.innerText.toLowerCase();
      item.style.display = text.includes(value) ? "block" : "none";
    });
  });
}

});
/* =====================
   THEME TOGGLE
===================== */

const toggleBtn = document.getElementById("themeToggle");
const root = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  toggleBtn.textContent = savedTheme === "light" ? "🌞" : "🌙";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  toggleBtn.textContent = currentTheme === "light" ? "🌞" : "🌙";
});


