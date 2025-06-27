
const img = document.getElementById("creepyImage");
const glitchContainer = document.getElementById("glitchMessages");
const blackout = document.getElementById("blackout");
const modal = document.getElementById("warningModal");
const whisper = document.getElementById("whisper");
const laugh = document.getElementById("laugh");
const fire = document.getElementById("fireOverlay");

const hour = new Date().getHours();
let clickCount = 0;

const imageDay = "https://i.imgur.com/ltKIADI.jpeg";
const imageNight = "https://i.imgur.com/VvbH0gk.jpeg";
img.src = (hour >= 6 && hour < 17) ? imageDay : imageNight;

const glitchPhrases = [
  "WELCOME TO THE PITY PARTY",
  "WHY DID YOU COME BACK?",
  "EVERYTHING IS FINE",
  "EVERYONE IS WATCHING",
  "YOU SHOULDN'T HAVE CLICKED",
  "STAY AWHILE",
  "DO YOU FEEL SAFE?",
  "LAUGH. SMILE. BLEED.",
  "GLITCH IN THE CELEBRATION",
  "ERROR_404: JOY NOT FOUND",
  "YOU LEFT THEM AGAIN.",
  "IT'S NEVER ENOUGH.",
  "HUNGRY FOR MORE?"
];

img.addEventListener("click", () => {
  clickCount++;
  if (clickCount === 10) {
    document.getElementById("staticOverlay").style.opacity = "0.15";
    document.getElementById("bgMusic").style.display = "block";
  }


  if (clickCount === 33) whisper.play();
  if (clickCount === 66) laugh.play();
  if (clickCount === 70) document.body.classList.add("hide-cursor");
  if (clickCount === 85) modal.classList.remove("hidden");
  if (clickCount === 90) document.bodydocument.body.classList.add("cursed");
  if (clickCount === 95) fire.style.opacity = "0.85";

  if (clickCount >= 91 && clickCount <= 99) {
    injectHauntedText();
  }

  if (clickCount >= 100) {
    triggerBlackout();
  }
});

function injectHauntedText() {
  const tags = ['p', 'h1', 'h2', 'h3', 'li', 'span'];
  tags.forEach(tag => {
    document.querySelectorAll(tag).forEach(el => {
      if (Math.random() < 0.3) {
        const glitch = document.createElement("span");
        glitch.innerText = glitchPhrases[Math.floor(Math.random() * glitchPhrases.length)];
        glitch.style.color = "red";
        glitch.style.marginLeft = "10px";
        glitch.style.animation = "flicker 0.3s infinite alternate";
        glitch.style.fontSize = "0.9em";
        el.appendChild(glitch);
      }
    });
  });
}

function triggerBlackout() {
  blackout.style.display = "block";
  glitchContainer.style.display = "block";

  for (let i = 0; i < 80; i++) {
    const msg = document.createElement("div");
    msg.className = "glitchText";
    msg.innerText = glitchPhrases[Math.floor(Math.random() * glitchPhrases.length)];
    msg.style.top = Math.random() * 100 + "vh";
    msg.style.left = Math.random() * 100 + "vw";
    glitchContainer.appendChild(msg);
  }

  const finalMsg = document.createElement("div");
  finalMsg.className = "glitchText";
  finalMsg.innerText = "DON'T LEAVE ME";
  finalMsg.style.fontSize = "2.5rem";
  finalMsg.style.top = "45vh";
  finalMsg.style.left = "30vw";
  finalMsg.style.color = "#ff3333";
  glitchContainer.appendChild(finalMsg);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  const interval = setInterval(() => {
    x -= 10;
    y -= 3;
    window.scrollTo(0, 0);
    window.dispatchEvent(new MouseEvent('mousemove', {
      clientX: x,
      clientY: y
    }));
    if (x < 20 || y < 10) {
      clearInterval(interval);
    }
  }, 50);
}

if (localStorage.getItem("hasReturned")) {
  setTimeout(() => {
    alert("Back again? Still hungry?");
  }, 1000);
} else {
  localStorage.setItem("hasReturned", true);
}

// ==== FIRE PARTICLES ====
const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle(x, y) {
  particles.push({
    x: x || Math.random() * canvas.width,
    y: y || canvas.height,
    size: Math.random() * 4 + 1,
    speedY: Math.random() * -1.5 - 0.5,
    color: "rgba(" + (200 + Math.floor(Math.random()*55)) + ", " + Math.floor(Math.random()*100) + ", 0, 0.8)"
  });
}

function handleParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += p.speedY;
    p.size *= 0.97;
    if (p.size < 0.5) particles.splice(i, 1);
  });
}

function animateFire() {
  handleParticles();
  requestAnimationFrame(animateFire);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start fire after 90 clicks
function triggerFireEffect() {
  setInterval(() => {
    for (let i = 0; i < 5; i++) createParticle();
  }, 100);
  animateFire();

  // Flicker all text
  document.querySelectorAll("p, h1, h2, h3, span, div").forEach(el => {
    el.classList.add("flicker-text");
  });

  // Hover bursts
  document.body.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 3; i++) createParticle(e.clientX + Math.random()*10, e.clientY + Math.random()*10);
  });
}

let fireStarted = false;
document.addEventListener("click", () => {
  if (clickCount >= 90 && !fireStarted) {
    fireStarted = true;
    triggerFireEffect();
  }
});

// === BURN HOLES ON IMAGE ===
function burnHole(x, y) {
  for (let r = 5; r < 20; r += 2) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Create random holes over time near bottom half
setInterval(() => {
  if (fireStarted) {
    for (let i = 0; i < 2; i++) {
      const bx = Math.random() * canvas.width;
      const by = canvas.height * 0.7 + Math.random() * (canvas.height * 0.3);
      burnHole(bx, by);
    }
  }
}, 700);
