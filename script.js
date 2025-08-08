function createStars() {
  const container = document.querySelector("body");
  for (let i = 0; i < 1000; i++) {
    // Increase the number of stars to 1000
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = ".1px";
    star.style.height = ".1px";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    container.appendChild(star);
  }
}
createStars();
// Planet details in one place
const planetDetails = {
  Mercury:
    "Mercury is the smallest planet in our solar system and closest to the Sun.",
  Venus: "Venus has a thick, toxic atmosphere and is the hottest planet.",
  Earth:
    "Earth is the only known planet with life, with vast oceans and landmasses.",
  Mars: "Mars is known as the Red Planet due to its iron oxide-rich surface.",
  Jupiter:
    "Jupiter is the largest planet, famous for its Great Red Spot storm.",
  Saturn: "Saturn is adorned with stunning rings made of ice and rock.",
  Uranus:
    "Uranus rotates on its side and has a bluish-green color due to methane.",
  Neptune: "Neptune is the farthest known planet, with supersonic winds.",
  Pluto: "Pluto is a dwarf planet in the Kuiper Belt with a thin atmosphere.",
};

// Show planet info in panel
function showPlanetInfo(name, details) {
  document.getElementById("planet-name").innerText = name;
  document.getElementById("planet-details").innerText = details;
  document.getElementById("info-panel").classList.add("show");
}

// Attach click events for each planet automatically
Object.keys(planetDetails).forEach((planet) => {
  const el = document.getElementById(planet.toLowerCase());
  if (el) {
    console.log;
    git;
    el.addEventListener("click", () => {
      console.log(el, "Hellow");
      showPlanetInfo(planet, planetDetails[planet]);
    });
  }
});

// Optional: close panel on background click (if needed)
document.addEventListener("click", (e) => {
  const panel = document.getElementById("info-panel");
  if (
    panel.classList.contains("show") &&
    !panel.contains(e.target) &&
    !e.target.closest(
      ".mercury, .venus, .earth, .mars, .jupiter, .saturn, .uranus, .neptune, .pluto"
    )
  ) {
    panel.classList.remove("show");
  }
});
