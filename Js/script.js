// script.js
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const colors = ["#4feeff", "#0520ab", "#ffffff", "#0520ab", "#ffffff"];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1 + 2;
    this.speedX = Math.random() * 0.8 - 0.4;
    this.speedY = Math.random() * 0.8 - 0.4;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < 70; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});







document.addEventListener('DOMContentLoaded', () => {
  const hamIcon = document.getElementById('ham-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');
  const dropdownContent = document.querySelector('.dropdown-content');

  hamIcon.addEventListener('click', () => {
    hamIcon.classList.toggle('active');
    mobileMenu.classList.toggle('show');
  });

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    dropdownContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // 👇 fixed this part:
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !e.target.classList.contains('dropdown-toggle')) {
        dropdown.classList.remove('open');
      }
    });
  }
});








  
const revealElements = document.querySelectorAll('.reveal-up');

  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.5
});

  revealElements.forEach(el => observer.observe(el));



 

  // ai art 


document.addEventListener('DOMContentLoaded', () => {
  const likeBtns = document.querySelectorAll('.like-btn');
  likeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('liked');
    });
  });
});







// animation


  gsap.registerPlugin(ScrollTrigger);

  // Animate all .from-left elements
  gsap.utils.toArray(".from-left").forEach((el) => {
    gsap.fromTo(el,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      });
  });

  // Animate all .from-right elements
  gsap.utils.toArray(".from-right").forEach((el) => {
    gsap.fromTo(el,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      });
  });





  // certificate 
function validateContactForm(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const alertBox = document.getElementById("formAlert");

  // Reset alert
  alertBox.style.display = "none";
  alertBox.textContent = "";

  if (!name || !email || !message) {
    alertBox.textContent = "Please fill out all fields.";
    alertBox.className = "form-alert error";
    alertBox.style.display = "block";
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alertBox.textContent = "Please enter a valid email address.";
    alertBox.className = "form-alert error";
    alertBox.style.display = "block";
    return false;
  }

  fetch("https://formspree.io/f/mzzwoqkd", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  })
  .then(response => {
    if (response.ok) {
      alertBox.textContent = "Message sent successfully!";
      alertBox.className = "form-alert success";
      alertBox.style.display = "block";
      form.reset();
    } else {
      alertBox.textContent = "Oops! Something went wrong. Please try again.";
      alertBox.className = "form-alert error";
      alertBox.style.display = "block";
    }
  })
  .catch(() => {
    alertBox.textContent = "Oops! Something went wrong. Please try again.";
    alertBox.className = "form-alert error";
    alertBox.style.display = "block";
  });

  return false;
}
