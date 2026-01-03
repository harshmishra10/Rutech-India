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
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // CLOSE MENU ON LINK CLICK
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // CLOSE MENU ON ESCAPE KEY
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
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
        setTimeout(type, 55);
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
     - Proper ARIA attributes
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
        const otherBtn = other.querySelector(".product-header");
        const otherIcon = other.querySelector(".product-header span");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        if (otherIcon) otherIcon.textContent = "+";
      });

      // Open current if it was closed
      if (!isOpen) {
        item.classList.add("active");
        headerBtn.setAttribute("aria-expanded", "true");
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
          const headerBtn = item.querySelector(".product-header");
          const icon = item.querySelector(".product-header span");
          if (headerBtn) headerBtn.setAttribute("aria-expanded", "false");
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

  /* =====================
     CONTACT FORM SUBMISSION
===================== */

  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm && formSuccess) {
    // Global function for form submission
    window.handleFormSubmit = function() {
      // Show success message after brief delay
      setTimeout(() => {
        contactForm.style.display = "none";
        formSuccess.style.display = "block";
      }, 700);
      
      return true; // Allow form submission to continue
    };

    // Alternative: Listen for iframe load (more reliable)
    const hiddenIframe = document.querySelector('iframe[name="hidden_iframe"]');
    if (hiddenIframe) {
      hiddenIframe.addEventListener("load", () => {
        if (contactForm.querySelector('input[name="entry.570626741"]').value !== "") {
          contactForm.style.display = "none";
          formSuccess.style.display = "block";
        }
      });
    }
  }

  /* =====================
     BACK TO TOP BUTTON
===================== */

  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    function toggleBackToTop() {
      if (window.scrollY > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    window.addEventListener("scroll", toggleBackToTop);
    toggleBackToTop(); // Initial check
  }

  /* =====================
     ACTIVE NAV LINK HIGHLIGHT
===================== */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  /* =====================
     LAZY LOADING IMAGES (Enhanced Performance)
===================== */

  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  /* =====================
     FORM VALIDATION ENHANCEMENT
===================== */

  const formInputs = document.querySelectorAll('input[required], textarea[required]');

  formInputs.forEach(input => {
    input.addEventListener("invalid", (e) => {
      e.preventDefault();
      input.classList.add("error");
    });

    input.addEventListener("input", () => {
      if (input.validity.valid) {
        input.classList.remove("error");
      }
    });
  });

  /* =====================
     SMOOTH SCROLL FOR ANCHOR LINKS
===================== */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  /* =====================
     PERFORMANCE: Preload Critical Resources
===================== */

  function preloadCriticalAssets() {
    // Preload hero video on faster connections
    if (navigator.connection && navigator.connection.effectiveType === "4g") {
      const heroVideo = document.querySelector(".hero-video");
      if (heroVideo) {
        heroVideo.preload = "auto";
      }
    }
  }

  preloadCriticalAssets();

  /* =====================
     ACCESSIBILITY: Focus Management
===================== */

  // Trap focus in mobile menu when open
  if (mainNav) {
    const focusableElements = mainNav.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      mainNav.addEventListener("keydown", (e) => {
        if (!mainNav.classList.contains("active")) return;

        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });
    }
  }

  /* =====================
     SCROLL EVENTS (Optimized with throttle)
===================== */

  let scrollTimeout;
  function handleScrollEvents() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
      handleReveal();
      handleHeaderShrink();
    });
  }

  window.addEventListener("scroll", handleScrollEvents, { passive: true });

  // Initial run
  handleReveal();
  handleHeaderShrink();

  /* =====================
     PAGE LOAD PERFORMANCE LOGGING (Development)
===================== */

  if (window.performance && window.performance.timing) {
    window.addEventListener("load", () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page Load Time: ${pageLoadTime}ms`);
    });
  }

  /* =====================
     PRINT OPTIMIZATION
===================== */

  window.addEventListener("beforeprint", () => {
    // Hide unnecessary elements before printing
    document.querySelectorAll(".whatsapp-float, .back-to-top").forEach(el => {
      el.style.display = "none";
    });
  });

  window.addEventListener("afterprint", () => {
    // Restore hidden elements after printing
    document.querySelectorAll(".whatsapp-float, .back-to-top").forEach(el => {
      el.style.display = "";
    });
  });

});

/* =====================
   SERVICE WORKER REGISTRATION (Progressive Web App Ready)
   Uncomment when service worker is implemented
===================== */

/*
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => console.log("Service Worker registered"))
      .catch(err => console.log("Service Worker registration failed", err));
  });
}
*/
