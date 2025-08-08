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

  createBox(p);
});

document.querySelector("#mercury").addEventListener("click", async (e) => {
  let p = await getPlanet("mercury");
  createBox(p);
});

document.querySelector("#venus").addEventListener("click", async (e) => {
  let p = await getPlanet("venus");
  createBox(p);
});

document.querySelector("#saturn").addEventListener("click", async (e) => {
  let p = await getPlanet("saturn");
  createBox(p);
});
document.querySelector("#mars").addEventListener("click", async (e) => {
  let p = await getPlanet("mars");
  createBox(p);
});

document.querySelector("#jupiter").addEventListener("click", async (e) => {
  let p = await getPlanet("jupiter");
  createBox(p);
});

document.querySelector("#uranus").addEventListener("click", async (e) => {
  let p = await getPlanet("uranus");
  createBox(p);
});

document.querySelector("#neptune").addEventListener("click", async (e) => {
  let p = await getPlanet("neptune");
  createBox(p);
});

function createBox(p) {
  let html = `
  <div
      id="planetInfo"
      style="
        width: 300px;
        height: 300px;
        background-color: #e1dbdbe4;
        position: absolute;
        top: 0px;
        left: 0px;
        border-radius: 16px;
        padding: 20px;
        margin: 10px;
        box-sizing: border-box;
        font-family: 'Segoe UI', sans-serif;
        color: #222;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      "
    >
      <h2
        id="planetName"
        style="
          margin: 0 0 10px 0;
          font-size: 22px;
          text-align: center;
          color: #b3541e;
        "
      > ${p.name}</h2>

      <div
        class="planet-details"
        style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          row-gap: 8px;
          column-gap: 12px;
          flex: 1;
        "
      >
        <div class="label" style="font-weight: 600; opacity: 0.8">
          Temperature (K):
        </div>
        <div class="value" id="tempK" style="text-align: right; opacity: 0.95">
          ${p.temperatureK}
        </div>

        <div class="label" style="font-weight: 600; opacity: 0.8">
          Gravity (m/s²):
        </div>
        <div
          class="value"
          id="gravity"
          style="text-align: right; opacity: 0.95"
        >
          ${p.gravity}
        </div>

        <div class="label" style="font-weight: 600; opacity: 0.8">
          Mass (kg):
        </div>
        <div class="value" id="massKg" style="text-align: right; opacity: 0.95">
          ${p.massKg}
        </div>

        <div class="label" style="font-weight: 600; opacity: 0.8">
          Radius (km):
        </div>
        <div
          class="value"
          id="radiusKm"
          style="text-align: right; opacity: 0.95"
        >
          ${p.radiusKm}
        </div>

        <div class="label" style="font-weight: 600; opacity: 0.8">
          Orbital Period (days):
        </div>
        <div
          class="value"
          id="orbitalPeriod"
          style="text-align: right; opacity: 0.95"
        >
          ${p.orbitalPeriodDays}
        </div>
      </div>
    </div>

  `;
  document.getElementById("js-p-box").innerHTML = html;
  console.log(html);
}
