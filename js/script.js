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

const typingTarget = document.getElementById("typing-text");

if (typingTarget) {
  const textLines = [
    "SOLVING PROBLEMS",
    "OF CASTINGS"
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentText = "";
  let isDeleting = false;

  function typeEffect() {
    if (lineIndex < textLines.length) {
      const fullText = textLines[lineIndex];

      currentText = fullText.slice(0, charIndex + 1);
      typingTarget.innerHTML =
        currentText + (lineIndex === 0 ? "<br>" : "");

      charIndex++;

      if (charIndex === fullText.length) {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeEffect, 600); // pause between lines
        return;
      }
    }
    setTimeout(typeEffect, 60); // typing speed
  }

  typeEffect();
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
