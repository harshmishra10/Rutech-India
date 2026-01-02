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
   MOBILE MENU – FIXED
===================== */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

  // FORCE CLOSED ON LOAD
  mainNav.classList.remove("active");
  menuToggle.textContent = "☰";
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // CLOSE MENU ON LINK CLICK
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


  /* =====================
     HERO TYPING EFFECT (SMOOTH)
  ===================== */

  const typingEl = document.getElementById("typing-text");

  if (typingEl) {
    const fullText = typingEl.textContent.trim();
    typingEl.textContent = "";
    let index = 0;

    function type() {
      if (index < fullText.length) {
        typingEl.textContent += fullText.charAt(index);
        index++;
        setTimeout(type, 55); // smoother
      } else {
        typingEl.innerHTML = typingEl.textContent.replace(
          "PROBLEMS ",
          "PROBLEMS<br>"
        );
      }
    }

    setTimeout(type, 400);
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
     PRODUCT ACCORDION (FIXED)
     - Only one open at a time
     - Icon state synced
===================== */

  const productItems = document.querySelectorAll(".product-item");

  productItems.forEach(item => {
    const headerBtn = item.querySelector(".product-header");
    const icon = headerBtn?.querySelector("span");

    if (!headerBtn) return;

    headerBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all
      productItems.forEach(other => {
        other.classList.remove("active");
        const otherIcon = other.querySelector(".product-header span");
        if (otherIcon) otherIcon.textContent = "+";
      });

      // Open current if it was closed
      if (!isOpen) {
        item.classList.add("active");
        if (icon) icon.textContent = "×";
      }
    });
  });

  /* =====================
     PRODUCT SEARCH (SAFE)
===================== */

  const searchInput = document.getElementById("productSearch");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();

      productItems.forEach(item => {
        const text = item.innerText.toLowerCase();
        const match = text.includes(value);

        item.style.display = match ? "block" : "none";

        // Reset accordion state when filtering
        if (!match) {
          item.classList.remove("active");
          const icon = item.querySelector(".product-header span");
          if (icon) icon.textContent = "+";
        }
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

    if (savedTheme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }

    toggleBtn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";

      if (isLight) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    });
  }
   let submitted = false;

document.querySelector("form")?.addEventListener("submit", () => {
  setTimeout(() => {
    const success = document.getElementById("formSuccess");
    if (success) success.style.display = "block";
  }, 700);
});


  /* =====================
     SCROLL EVENTS
===================== */

  window.addEventListener("scroll", () => {
    handleReveal();
    handleHeaderShrink();
  });

  // Initial run
  handleReveal();
  handleHeaderShrink();

});
