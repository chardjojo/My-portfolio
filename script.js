const words = ["Mijn Portfolio"];

 
let wordIndex = 0;    
let charIndex = 0;    
let deleting = false; 
 

const typedEl = document.getElementById("typed-text");
const cursorEl = document.createElement("span");
cursorEl.classList.add("cursor");
typedEl.parentNode.insertBefore(cursorEl, typedEl.nextSibling);
 
function typeEffect() {
    const current = words[wordIndex]; 
 
    if (!deleting) {
        
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
 
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
    } else {
        
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
 
        if (charIndex === 0) {
            
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length; 
        }
    }
 
    setTimeout(typeEffect, deleting ? 55 : 100);
}
 
typeEffect(); 

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }

    });
}, { threshold: 0.1 }); 
 

document.querySelectorAll(".fade-in").forEach(function(el) {
    observer.observe(el);
});
 
 

const skillsSection = document.querySelector("#skills");
 
const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            document.querySelectorAll(".skill-fill").forEach(function(bar) {
            bar.style.width = bar.dataset.level + "%";
            });
        }
    });
}, { threshold: 0.2 }); 
 
skillObserver.observe(skillsSection);
 
 
const navLinks = document.querySelectorAll("#main-nav a");
 
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");

            navLinks.forEach(function(link) {
                link.classList.remove("active");
            });
 
            const activeLink = document.querySelector('#main-nav a[href="#' + id + '"]');
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}, { threshold: 0.4 }); 
 
document.querySelectorAll("section[id]").forEach(function(sec) {
    sectionObserver.observe(sec);
});
 
 
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener("click", function(e) {
        e.preventDefault();
 
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});