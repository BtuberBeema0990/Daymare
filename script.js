
const img = document.getElementById("creepyImage");
const glitchContainer = document.getElementById("glitchMessages");
const blackout = document.getElementById("blackout");
const modal = document.getElementById("warningModal");
const whisper = document.getElementById("whisper");
const laugh = document.getElementById("laugh");
const fire = document.getElementById("fireOverlay");

const hour = new Date().getHours();
let clickCount = 0;

const imageDay = "https://i.imgur.com/YOUR_DAY_IMAGE.png";
const imageNight = "https://i.imgur.com/YOUR_NIGHT_IMAGE.png";
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

  if (clickCount === 33) whisper.play();
  if (clickCount === 66) laugh.play();
  if (clickCount === 70) document.body.classList.add("hide-cursor");
  if (clickCount === 85) modal.classList.remove("hidden");
  if (clickCount === 95) fire.style.opacity = "0.85";

  if (clickCount >= 100) {
    triggerBlackout();
  }
});

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

  // Simulate mouse movement toward the reload button
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
