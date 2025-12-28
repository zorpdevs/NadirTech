/* =========================================
   1. Typing Animation
   ========================================= */
const typeEffect = document.querySelector('.type-effect');
const words = ["Software Engineer", "CSE Graduate", "Full Stack Dev", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) { charIndex--; } else { charIndex++; }
    typeEffect.textContent = currentWord.substring(0, charIndex);
    let typeSpeed = isDeleting ? 80 : 150;
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', type);

/* =========================================
   2. Mobile Menu Toggle & Auto Close
   ========================================= */
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    if(navLinks.classList.contains('active')){
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// AUTO CLOSE: Close menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

/* =========================================
   3. Scroll Progress & Back to Top
   ========================================= */
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.querySelector(".scroll-progress").style.width = scrolled + "%";
    
    const backToTop = document.getElementById("backToTop");
    if (winScroll > 300) {
        backToTop.style.display = "flex";
    } else {
        backToTop.style.display = "none";
    }
};

document.getElementById('backToTop').addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================================
   4. Advanced Scroll Reveal Animations
   ========================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/* =========================================
   5. Infinite Tech Scroller Logic
   ========================================= */
const scrollers = document.querySelectorAll(".tech-scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);
    const scrollerInner = scroller.querySelector(".scroller-inner");
    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

/* =========================================
   6. PROJECT MODAL DATA & LOGIC
   ========================================= */
const projectsData = {
    portfolio: {
        title: "Personal Portfolio Website",
        desc: "A high-performance, responsive portfolio website built to showcase my skills and projects as a Software Engineer. It features a dark-themed aesthetic, infinite scrolling tech stack, and 3D visual elements.",
        unique: "Unlike standard template portfolios, this site uses vanilla JavaScript for all animations (no heavy libraries like GSAP), ensuring lightning-fast load times (Lighthouse Score: 98/100). The 3D pop-out hero effect is custom-coded using CSS layers.",
        optimize: "I optimized the site by using CSS variables for theming, reducing DOM reflows by using 'transform' for animations instead of 'margin/padding', and compressing all assets. The infinite scroller uses cloned DOM nodes for seamless looping.",
        experience: "This project taught me the importance of Web Accessibility (ARGB) and how to handle cross-browser compatibility. I also learned how to deploy and manage a live site using GitHub Pages.",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    },
    ecommerce: {
        title: "E-Commerce UI Kit",
        desc: "A modern frontend user interface for an online store. It includes a dynamic product grid, a shopping cart that updates in real-time, and category filtering.",
        unique: "It implements a 'State-based' UI approach without a framework. I built a custom State Manager in Vanilla JS to handle cart updates, similar to how Redux works, but lightweight.",
        optimize: "Implemented 'Lazy Loading' for product images to speed up initial load. Used Event Delegation for product buttons to reduce memory usage instead of attaching listeners to every single button.",
        experience: "I gained deep insights into how complex state management works in large applications. It also improved my CSS Grid and Flexbox skills significantly.",
        tech: ["React.js", "Redux", "CSS Modules", "API Integration"]
    },
    student: {
        title: "Student Management System",
        desc: "A desktop/web application to manage student records, attendance, and grades. It allows CRUD (Create, Read, Update, Delete) operations on a database.",
        unique: "Focuses on data integrity and security. I implemented SQL Injection prevention techniques and efficient search algorithms to find students instantly among thousands of records.",
        optimize: "Optimized SQL queries by using Indexing on student IDs. Used Java's efficient collection frameworks to handle in-memory data processing before saving to the DB.",
        experience: "This was my first deep dive into Backend logic and Database connectivity (JDBC). I learned how to structure a full-stack application and handle errors gracefully.",
        tech: ["Java", "MySQL", "JDBC", "OOP Principles"]
    }
};

// Modal Elements
const modal = document.getElementById("projectModal");
const closeModal = document.querySelector(".close-modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalUnique = document.getElementById("modalUnique");
const modalOptimize = document.getElementById("modalOptimize");
const modalExperience = document.getElementById("modalExperience");
const modalTech = document.getElementById("modalTech");

// Open Modal logic
document.querySelectorAll(".btn-case-study").forEach(btn => {
    btn.addEventListener("click", () => {
        const projectId = btn.getAttribute("data-id");
        const project = projectsData[projectId];

        if (project) {
            modalTitle.innerText = project.title;
            modalDesc.innerText = project.desc;
            modalUnique.innerText = project.unique;
            modalOptimize.innerText = project.optimize;
            modalExperience.innerText = project.experience;
            
            // Clear previous tech stack and add new
            modalTech.innerHTML = "";
            project.tech.forEach(t => {
                const span = document.createElement("span");
                span.innerText = t;
                modalTech.appendChild(span);
            });

            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Disable scroll
        }
    });
});

// Close Modal logic
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Enable scroll
});

// Close if clicked outside content
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});
