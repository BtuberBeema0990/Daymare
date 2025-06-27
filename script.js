
const img = document.getElementById("creepyImage");
const hour = new Date().getHours();
let clickCount = 0;

const imageDay = "https://i.imgur.com/ltKIADI.jpeg";
const imageNight = "https://i.imgur.com/VvbH0gk.jpeg";

img.src = (hour >= 6 && hour < 17) ? imageDay : imageNight;

img.addEventListener("click", () => {
  clickCount++;
  if (clickCount >= 3) {
    img.style.filter = "contrast(1.5) saturate(2) hue-rotate(180deg)";
    img.style.boxShadow = "0 0 40px rgba(255, 0, 0, 0.6)";
  }
  if (clickCount >= 6) {
    img.style.transform = "scale(1.05) rotate(1deg)";
    img.alt = "Stop clicking.";
  }
  if (clickCount >= 9) {
    img.src = imageNight;
  }
});
