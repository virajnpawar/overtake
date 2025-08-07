// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// scramble-type
(function () {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~";

  function runScrambleType(element) {
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
            element.textContent = targetText; // Final without cursor
          }
        }
      }, 30);
    }

    animateLetter(0);
  }

  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".scramble-type").forEach(el => runScrambleType(el));
  });
})();

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
    scrub: 2,
  }
});


// (function () {
//   const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~";
//   const element = document.querySelector(".scramble-text");
//   const originalText = element.textContent.trim();
//   const textLength = originalText.length;
//   let scrambleStarted = false;
//   const startAfter = 2; // how many characters to skip at the beginning

//   function scrambleByProgress(progress) {
//     if (!element || !originalText) return;

//     let visibleCount = Math.floor(progress * textLength);

//     if (visibleCount < startAfter) {
//       element.textContent = ""; // hide until 2 chars worth of scroll
//       return;
//     }

//     let output = "";
//     for (let i = 0; i < textLength; i++) {
//       if (i < visibleCount) {
//         output += originalText[i];
//       } else if (i === visibleCount) {
//         output += charSet[Math.floor(Math.random() * charSet.length)];
//       } else {
//         break;
//       }
//     }

//     if (visibleCount < textLength) {
//       output += "_";
//     }

//     element.textContent = output;
//   }

//   gsap.timeline({
//     scrollTrigger: {
//       trigger: ".introparent",
//       start: "top -150%",
//       end: "top -200%",
//       scrub: 3,
//       // pin: true,
//       scroller: "body",
//       markers: false,
//       onUpdate: (self) => {
//         if (!scrambleStarted) {
//           element.style.visibility = "visible";
//           scrambleStarted = true;
//         }
//         scrambleByProgress(self.progress);
//       },
//       onLeave: () => {
//         element.textContent = originalText;
//       }
//     }
//   });
// })();

// let tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".introparent",
//     scroller: "body",
//     start: "top 0%",
//     end: "top -150%",
//     scrub: 2,
//     pin: true,
//     markers: true,
    
//   }
// });

// tl.from(".txt-h1", { x: "-300%" })
//   .from(".txt-h1 h1:nth-of-type(2)", { paddingLeft: "0%" })
//   .to(".introScroll", {
//     transform: "translateX(-20%)",
//   })

(function () {
  const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~";
  const element = document.querySelector(".scramble-text");
  const originalText = element.textContent.trim();
  const textLength = originalText.length;
  let scrambleStarted = false;

  function scrambleByProgress(progress) {
    if (!element || !originalText) return;

    const startAfter = 2;
    let visibleCount = Math.floor(progress * textLength);

    if (visibleCount < startAfter) {
      element.textContent = "";
      return;
    }

    let output = "";
    for (let i = 0; i < textLength; i++) {
      if (i < visibleCount) {
        output += originalText[i];
      } else if (i === visibleCount) {
        output += charSet[Math.floor(Math.random() * charSet.length)];
      } else {
        break;
      }
    }

    if (visibleCount < textLength) {
      output += "_";
    }

    element.textContent = output;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".introparent",
      scroller: "body",
      start: "top 0%",
      end: "top -400%",
      scrub: 2,
      pin: true,
      // markers: true,
      onUpdate: (self) => {
        if (scrambleStarted) {
          const scrambleSectionStart = 0.4;
          const scrambleSectionEnd = 0.6;
          let p = (self.progress - scrambleSectionStart) / (scrambleSectionEnd - scrambleSectionStart);
        
          // Clamp the progress between 0 and 1
          p = Math.max(0, Math.min(1, p));
        
          // Only scramble if still in range
          if (p < 1) {
            scrambleByProgress(p);
          } else {
            element.textContent = originalText; // Ensure final clean text
            // scrambleStarted = false; // Stop updating
          }
        }
        
      },
      onLeave: () => {
        element.textContent = originalText;
      }
    }
  });

  // Timeline structure:
  tl.from(".txt-h1", {
    x: "-300%",
    duration: 1
  })
  .from(".txt-h1 h1:nth-of-type(2)", {
    paddingLeft: "0%",
    duration: 1
  })
  // Add scramble activation here, after previous tween completes
  .add(() => {
    element.style.visibility = "visible";
    scrambleStarted = true;
  })
  // Dummy tween just to occupy scroll space for scrambling effect
  .to({}, { duration: 3})
  // Final animation after scramble is complete
  .to(".introScroll", {
    transform: "translateX(-23%)",
    duration: 2
  });

})();
