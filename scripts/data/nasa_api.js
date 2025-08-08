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

fetchPlanets();
