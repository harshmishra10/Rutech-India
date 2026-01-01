/* =====================
   DOM READY SAFETY
===================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     SCROLL REVEAL
  ===================== */

  const reveals = document.querySelectorAll(".reveal");

  function handleReveal() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  /* =====================
     HEADER SHRINK
  ===================== */

  const header = document.querySelector(".header");

  function handleHeaderShrink() {
    if (!header) return;

    if (window.scrollY > 60) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  }

  /* =====================
     PRODUCT ACCORDION
  ===================== */

  document.querySelectorAll(".product-header").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".product-item");
      if (item) {
        item.classList.toggle("active");
      }
    });
  });

  /* =====================
     PRODUCT SEARCH
  ===================== */

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

  /* =====================
     THEME TOGGLE
  ===================== */

  const toggleBtn = document.getElementById("themeToggle");
  const root = document.documentElement;

  if (toggleBtn) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      root.setAttribute("data-theme", savedTheme);
      toggleBtn.textContent = savedTheme === "light" ? "🌞" : "🌙";
    }

    toggleBtn.addEventListener("click", () => {
      const currentTheme =
        root.getAttribute("data-theme") === "light" ? "dark" : "light";

      root.setAttribute("data-theme", currentTheme);
      localStorage.setItem("theme", currentTheme);
      toggleBtn.textContent = currentTheme === "light" ? "🌞" : "🌙";
    });
  }

  /* =====================
     SCROLL EVENTS (ONE PLACE)
  ===================== */

  window.addEventListener("scroll", () => {
    handleReveal();
    handleHeaderShrink();
  });

  // Run once on load
  handleReveal();
  handleHeaderShrink();

});
