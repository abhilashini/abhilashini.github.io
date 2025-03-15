document.addEventListener("DOMContentLoaded", function () {
    // Fade-in animations
    const sections = document.querySelectorAll("section");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
  
    sections.forEach((section) => {
      observer.observe(section);
    });
  
    // Dynamic content loading
    const links = document.querySelectorAll("nav a");
    const main = document.querySelector("main");
  
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target.getAttribute("href").substring(1);
        fetch(`/${target}.html`)
          .then((response) => response.text())
          .then((data) => {
            main.innerHTML = data;
          });
      });
    });
  });