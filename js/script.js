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
   HERO TYPING EFFECT
===================== */

const typingEl = document.getElementById("typing-text");

if (typingEl) {
  const text = typingEl.textContent;
  typingEl.textContent = "";
  let index = 0;

  function type() {
    if (index < text.length) {
      typingEl.textContent += text.charAt(index);
      index++;
      setTimeout(type, 70);
    }
  }

  // slight delay so hero loads first
  setTimeout(type, 400);
}
typingEl.innerHTML = typingEl.textContent.replace(
  "PROBLEMS ",
  "PROBLEMS<br>"
);



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
   THEME TOGGLE (FINAL)
===================== */

const toggleBtn = document.getElementById("themeToggle");
const root = document.documentElement;

if (toggleBtn) {
  const savedTheme = localStorage.getItem("theme");

  // Apply saved theme on load
  if (savedTheme === "light") {
    root.setAttribute("data-theme", "light");
    toggleBtn.textContent = "🌞";
  } else {
    root.removeAttribute("data-theme"); // default dark
    toggleBtn.textContent = "🌙";
  }

  // Toggle on click
  toggleBtn.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";

    if (isLight) {
      // Switch to DARK (default)
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "🌙";
    } else {
      // Switch to LIGHT
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌞";
    }
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
