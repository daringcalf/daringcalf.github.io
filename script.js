document.addEventListener("DOMContentLoaded", () => {
  // Simulated progress bar
  simulateProgress();

  // Typing effect
  typeEffect();

  // Store all active particles
  window.activeParticles = [];

  // Add hover effects for tools
  const tools = document.querySelectorAll(".tool");
  tools.forEach((tool) => {
    tool.addEventListener("mouseenter", createParticles);
    tool.addEventListener("mouseleave", fadeOutAllParticles);
  });

  // Add parallax effect on mouse move
  document.addEventListener("mousemove", parallaxEffect);

  // Clean up particles that have completed their transition
  document.addEventListener("transitionend", function (e) {
    if (
      e.target.classList &&
      e.target.classList.contains("particle") &&
      e.propertyName === "opacity" &&
      e.target.style.opacity === "0"
    ) {
      if (e.target.parentNode) {
        e.target.parentNode.removeChild(e.target);
        // Remove from active particles array
        const index = window.activeParticles.indexOf(e.target);
        if (index > -1) {
          window.activeParticles.splice(index, 1);
        }
      }
    }
  });
});

// Fade out all active particles
function fadeOutAllParticles() {
  if (window.activeParticles.length > 0) {
    window.activeParticles.forEach((particle) => {
      particle.style.opacity = "0";
    });
  }
}

// Simulate loading progress
function simulateProgress() {
  let progress = 0;
  const progressBar = document.querySelector(".progress");
  const percentage = document.getElementById("percentage");

  const interval = setInterval(() => {
    if (progress >= 65) {
      clearInterval(interval);
      return;
    }

    progress += Math.random() * 5;
    if (progress > 65) progress = 65;

    const roundedProgress = Math.round(progress);
    progressBar.style.width = `${roundedProgress}%`;
    document.documentElement.style.setProperty(
      "--progress",
      `${roundedProgress}%`
    );
    percentage.textContent = `${roundedProgress}%`;
  }, 500);
}

// Typing effect for footer
function typeEffect() {
  const texts = [
    "Built with passion",
    "Coming soon",
    "Portfolio in progress",
    "Crafting experiences",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  const typedTextElement = document.querySelector(".typed-text");
  const cursorElement = document.querySelector(".cursor");

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typeSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1000);
}

// Parallax effect on mouse move
function parallaxEffect(e) {
  const glitch = document.querySelector(".glitch");
  const tools = document.querySelectorAll(".tool");
  const container = document.querySelector(".container");

  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

  glitch.style.transform = `translate(${xAxis * 0.5}px, ${yAxis * 0.5}px)`;
  container.style.transform = `translate(${xAxis * 0.2}px, ${yAxis * 0.2}px)`;

  tools.forEach((tool, index) => {
    const factor = 0.1 * (index + 1);
    tool.style.transform = `translateY(0) translate(${xAxis * factor}px, ${
      yAxis * factor
    }px)`;
  });
}

// Create particles on tool hover
function createParticles() {
  const colors = ["#3498db", "#e74c3c", "#f1c40f", "#1abc9c"];
  const tool = this;
  const rect = tool.getBoundingClientRect();
  const toolCenterX = rect.left + rect.width / 2;
  const toolCenterY = rect.top + rect.height / 2;

  // Clear existing particles when hovering on a new tool
  fadeOutAllParticles();

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Set particle style
    particle.style.position = "fixed";
    particle.style.width = `${Math.random() * 10 + 5}px`;
    particle.style.height = particle.style.width;
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "100";
    particle.style.opacity = "0";

    // CSS transitions for smooth appear/disappear
    particle.style.transition = "opacity 0.4s ease, transform 2s ease";

    // Generate random position around the tool
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 20 + 20;
    const posX = toolCenterX + Math.cos(angle) * distance;
    const posY = toolCenterY + Math.sin(angle) * distance;

    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;

    // Set initial transform for floating effect
    particle.style.transform = "translate(0, 0)";

    // Add to document
    document.body.appendChild(particle);
    window.activeParticles.push(particle);

    // Float animation using CSS transform
    setTimeout(() => {
      // Random movement
      const moveX = (Math.random() - 0.5) * 40;
      const moveY = (Math.random() - 0.5) * 40;
      particle.style.transform = `translate(${moveX}px, ${moveY}px)`;

      // Fade in with CSS transition
      particle.style.opacity = "0.8";
    }, 10);
  }
}
