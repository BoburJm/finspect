document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: "ease",
      once: false, // Changed to false to replay animations when scrolling back up
      offset: -10,
    })
  }

  // Add active class to nav links based on scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`)
        if (activeLink) {
          document.querySelectorAll("nav ul li a").forEach(link => link.classList.remove("active"))
          activeLink.classList.add("active")
        }
      }
    })
  }

  // Header scroll effect
  const header = document.getElementById("header")

  function headerScroll() {
    if (header && window.scrollY > 50) {
      header.classList.add("scrolled")
    } else if (header) {
      header.classList.remove("scrolled")
    }
  }

  // Back to top button
  const backToTopBtn = document.getElementById("backToTop")

  function scrollFunction() {
    if (backToTopBtn && window.scrollY > 500) {
      backToTopBtn.classList.add("visible")
    } else if (backToTopBtn) {
      backToTopBtn.classList.remove("visible")
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // Language selector functionality is handled in i18n.js to avoid conflicts

  // Add scroll event listeners
  window.addEventListener("scroll", () => {
    headerScroll()
    scrollFunction()
    setActiveNavLink()
  })

  // Trigger once on load
  headerScroll()
  scrollFunction()
  setActiveNavLink()
})

