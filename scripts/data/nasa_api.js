class Planet {
  constructor({
    name,
    temperatureK,
    gravity,
    massKg,
    radiusKm,
    orbitalPeriodDays,
  }) {
    this.name = name;
    this.temperatureK = temperatureK;
    this.temperatureC = +(temperatureK - 273.15).toFixed(2);
    this.temperatureF = +((this.temperatureC * 9) / 5 + 32).toFixed(2);
    this.gravity = gravity;
    this.massKg = massKg;
    this.radiusKm = radiusKm;
    this.orbitalPeriodDays = orbitalPeriodDays;
  }

  toString() {
    return `${this.name}:
  Temp: ${this.temperatureC}°C (${this.temperatureF}°F)
  Gravity: ${this.gravity} m/s²
  Mass: ${this.massKg.toExponential(3)} kg
  Radius: ${this.radiusKm} km
  Orbital Period: ${this.orbitalPeriodDays} days`;
  }
}

async function fetchPlanets() {
  const url =
    "https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true";
  const response = await fetch(url);
  const data = await response.json();

  const planets = data.bodies.map(
    (planet) =>
      new Planet({
        name: planet.englishName,
        temperatureK: planet.avgTemp,
        gravity: planet.gravity,
        massKg: planet.mass.massValue * Math.pow(10, planet.mass.massExponent),
        radiusKm: planet.meanRadius,
        orbitalPeriodDays: planet.sideralOrbit,
      })
  );

  planets.forEach((p) => console.log(p.toString() + "\n"));

  return planets;
}

async function getPlanet(PlanetName) {
  const url = `https://api.le-systeme-solaire.net/rest/bodies/${PlanetName}`;
  const response = await fetch(url);
  const planet = await response.json();

  let p = new Planet({
    name: planet.englishName,
    temperatureK: planet.avgTemp,
    gravity: planet.gravity,
    massKg: planet.mass.massValue * Math.pow(10, planet.mass.massExponent),
    radiusKm: planet.meanRadius,
    orbitalPeriodDays: planet.sideralOrbit,
  });

  return p;
}

document.querySelector("#earth").addEventListener("click", async (e) => {
  console.log("Earth");
  let p = await getPlanet("earth");

  const res = await fetch("/scripts/data/fun_facts.json");
  const data = await res.json();

  const planet = data.earth;
  makeFact(planet);
  createBox(p);
});

document.querySelector("#mercury").addEventListener("click", async (e) => {
  const res = await fetch("/scripts/data/fun_facts.json");
  const data = await res.json();
  const planet = data.mercury;
  makeFact(planet);
  let p = await getPlanet("mercury");
  createBox(p);
});

document.querySelector("#venus").addEventListener("click", async (e) => {
  let p = await getPlanet("venus");
  const res = await fetch("/scripts/data/fun_facts.json");
  const data = await res.json();
  const planet = data.venus;
  makeFact(planet);
  createBox(p);
});

document.querySelector("#saturn").addEventListener("click", async (e) => {
  let p = await getPlanet("saturn");

  const res = await fetch("/scripts/data/fun_facts.json");
  const data = await res.json();
  const planet = data.saturn;
  makeFact(planet);
  createBox(p);
});
document.querySelector("#mars").addEventListener("click", async (e) => {
  let p = await getPlanet("mars");

  const res = await fetch("/scripts/data/fun_facts.json");
  const data = await res.json();
  const planet = data.mars;
  makeFact(planet);
  createBox(p);
});

document.querySelector("#jupiter").addEventListener("click", async (e) => {
  let p = await getPlanet("jupiter");

  const res = await fetch("/scripts/data/fun_facts.json");
  const data = await res.json();
  const planet = data.jupiter;
  makeFact(planet);
  createBox(p);
});

document.querySelector("#uranus").addEventListener("click", async (e) => {
  let p = await getPlanet("uranus");
  const res = await fetch("/scripts/data/fun_facts.json");
  const data = await res.json();
  const planet = data.uranus;
  makeFact(planet);
  createBox(p);
});

document.querySelector("#neptune").addEventListener("click", async (e) => {
  let p = await getPlanet("neptune");
  const res = await fetch("/scripts/data/fun_facts.json");
  const data = await res.json();
  const planet = data.neptune;
  makeFact(planet);
  createBox(p);
});

function createBox(p) {
  let html = `
  <div
  id="planetInfo"
  style="
    width: 320px;
    height: 320px;
    background: rgba(30, 30, 30, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 18px;
    padding: 20px;
    margin: 10px;
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
    color: #f1f1f1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
  "
>
  <h2
    id="planetName"
    style="
      margin: 0 0 14px 0;
      font-size: 24px;
      text-align: center;
      color: #ff884d;
      letter-spacing: 1px;
    "
  >
    ${p.name}
  </h2>

  <div
    class="planet-details"
    style="
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 10px;
      column-gap: 12px;
      flex: 1;
    "
  >
    <div class="label" style="font-weight: 600; opacity: 0.75; color: #bbb;">
      Temperature (K):
    </div>
    <div
      class="value"
      id="tempK"
      style="text-align: right; opacity: 0.95; color: #fff;"
    >
      ${p.temperatureK}
    </div>

    <div class="label" style="font-weight: 600; opacity: 0.75; color: #bbb;">
      Gravity (m/s²):
    </div>
    <div
      class="value"
      id="gravity"
      style="text-align: right; opacity: 0.95; color: #fff;"
    >
      ${p.gravity}
    </div>

    <div class="label" style="font-weight: 600; opacity: 0.75; color: #bbb;">
      Mass (kg):
    </div>
    <div
      class="value"
      id="massKg"
      style="text-align: right; opacity: 0.95; color: #fff;"
    >
      ${p.massKg}
    </div>

    <div class="label" style="font-weight: 600; opacity: 0.75; color: #bbb;">
      Radius (km):
    </div>
    <div
      class="value"
      id="radiusKm"
      style="text-align: right; opacity: 0.95; color: #fff;"
    >
      ${p.radiusKm}
    </div>

    <div class="label" style="font-weight: 600; opacity: 0.75; color: #bbb;">
      Orbital Period (days):
    </div>
    <div
      class="value"
      id="orbitalPeriod"
      style="text-align: right; opacity: 0.95; color: #fff;"
    >
      ${p.orbitalPeriodDays}
    </div>
  </div>
</div>


  `;
  document.getElementById("js-p-box").innerHTML = html;
}

// HARDWARE

setInterval(async () => {
  const res = await fetch("http://192.168.193.52/temperature");
  const data = await res.json();

  document.getElementById(
    "temp"
  ).innerHTML = ` Temperature:  ${data.temperature} °C`;
  document.getElementById("hum").innerHTML = ` Humidity: ${data.humidity} %`;
}, 1000);

// fetchTemperature();

//  FUN FACT

function makeFact(planet) {
  const randomIndex = Math.floor(Math.random() * planet.length);
  const randomFact = planet[randomIndex];
  console.log("Random Earth fun fact:", randomFact);
  document.getElementById("js-fun-fact").innerHTML = randomFact;
}
