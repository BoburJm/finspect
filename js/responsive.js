// Enhanced Mobile Responsiveness

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const nav = document.querySelector("nav")
  const body = document.body

  // Create overlay element
  function createOverlay() {
    const overlayElement = document.createElement("div")
    overlayElement.className = "mobile-overlay"
    overlayElement.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
      transition: opacity 0.3s ease;
    `
    document.body.appendChild(overlayElement)
    return overlayElement
  }

  const overlay = document.querySelector(".mobile-overlay") || createOverlay()

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isActive = mobileMenuBtn.classList.contains("active")
      
      if (isActive) {
        // Close menu
        mobileMenuBtn.classList.remove("active")
        nav.classList.remove("active")
        if (overlay) overlay.style.display = "none"
        body.classList.remove("menu-open")
      } else {
        // Open menu
        mobileMenuBtn.classList.add("active")
        nav.classList.add("active")
        if (overlay) overlay.style.display = "block"
        body.classList.add("menu-open")
      }
    })

    // Close menu when clicking on overlay
    if (overlay) {
      overlay.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        nav.classList.remove("active")
        overlay.style.display = "none"
        body.classList.remove("menu-open")
      })
    }

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll("nav ul li a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        nav.classList.remove("active")
        if (overlay) overlay.style.display = "none"
        body.classList.remove("menu-open")
      })
    })
  }

  // Fix for iOS 100vh issue
  function setMobileHeight() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }

  // Set initial height
  setMobileHeight()

  // Update on resize
  window.addEventListener("resize", () => {
    setMobileHeight()
    
    // Close mobile menu on desktop resize
    if (window.innerWidth > 768) {
      if (mobileMenuBtn) mobileMenuBtn.classList.remove("active")
      if (nav) nav.classList.remove("active")
      if (overlay) overlay.style.display = "none"
      body.classList.remove("menu-open")
    }
  })

  // Improve form usability on mobile
  const formInputs = document.querySelectorAll("input, textarea, select")
  formInputs.forEach((input) => {
    // Add focus class for better visual feedback on mobile
    input.addEventListener("focus", function () {
      if (this.parentElement) {
        this.parentElement.classList.add("input-focused")
      }
    })

    input.addEventListener("blur", function () {
      if (this.parentElement) {
        this.parentElement.classList.remove("input-focused")
      }
    })
  })

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      if (targetId !== "#") {
        e.preventDefault()
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const headerOffset = 80
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Prevent horizontal scroll on mobile
  document.addEventListener("touchstart", () => {}, { passive: true })
  document.addEventListener("touchmove", () => {}, { passive: true })
})

