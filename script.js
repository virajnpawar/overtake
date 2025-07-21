// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


// text effect
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~";

function scrambleText(element) {
  const targetText = element.textContent.trim();
  let currentIndex = 0;

  function animateLetter(index) {
    let frame = 0;
    const interval = setInterval(() => {
      let output = "";

      for (let i = 0; i < targetText.length; i++) {
        if (i < index) {
          output += targetText[i];
        } else if (i === index) {
          output += characters[Math.floor(Math.random() * characters.length)];
        } else {
          break;
        }
      }

      output += "_"; // cursor
      element.textContent = output;
      frame++;

      if (frame > 2) {
        clearInterval(interval);
        currentIndex++;
        element.textContent = targetText.slice(0, currentIndex) + "_";
        if (currentIndex < targetText.length) {
          setTimeout(() => animateLetter(currentIndex), 50);
        } else {
          element.textContent = targetText; // final display (no cursor)
        }
      }
    },  30);
  }

  animateLetter(0);
}

// Apply to all elements with the class .scramble-type
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".scramble-type").forEach(el => scrambleText(el));
});


// page2

