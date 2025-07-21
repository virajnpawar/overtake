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

//scramble text

const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~";

function scrambleText(element) {
  element.style.visibility = "visible";
  
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
          output += char[Math.floor(Math.random() * char.length)];
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
          setTimeout(() => animateLetter(currentIndex), 10 );
        } else {
          startBlinkingCursor(element, targetText); // ✅ call blink after finish
        }
      }
    }, 1);
  }

  animateLetter(0);
}

// ✅ Cursor Blinking
function startBlinkingCursor(element, finalText) {
  let blink = true;
  setInterval(() => {
    element.textContent = blink ? finalText + "_" : finalText + " ";
    blink = !blink;
  }, 500);
}


// page2
gsap.registerPlugin(ScrollTrigger);



gsap.to(".intro", {
  height: "100vh",
  width: "100%",
  backgroundPosition: "0",
  scrollTrigger: {
    trigger: ".intro",
    scroller: "body",
    // markers: true,
    start: "top 74%",
    end: "top 0",
    scrub:2,
  }
});

// gsap.from(".txt-h1", {
//   x: "-300%",
//   scrollTrigger: {
//     trigger: ".introparent",
//     scroller: "body",
//     // markers: true,
//     start: "top 0%",
//     end: "top -100%",
//     scrub: 2,
//     pin:true
//   }
// });

// gsap.from(".we-word", {
//   paddingLeft:"0",
//   scrollTrigger: {
//     trigger: ".introparent",
//     scroller: "body",
//     markers: true,
//     start: "top -10%",
//     end: "top -110%",
//     scrub: 2,
//     pin:true
//   }
// });

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".introparent",
    scroller: "body",
    start: "top 0%",
    end: "top -100%",
    scrub: 2,
    pin: true,
    markers: true,
  }
});

tl.from(".txt-h1", { x: "-300%" })
  .from(".txt-h1 h1:nth-of-type(2)", { paddingLeft: "0%" })
  .to(".scramble-text", {
    onStart: () => scrambleText(document.querySelector(".scramble-text"))
  });

