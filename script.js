function sayHello() {
  alert("Welcome to the PNM Class Website!");
}

//This part of the code is for the Map
const map = L.map('map').setView([37.3,-121.9], 6);

// Add map background (tiles)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Adds a pin for each PNM
pnms.forEach(pnm => {
  if (pnm.coords) {
    L.marker(pnm.coords)
      .addTo(map)
      .bindPopup("<b>" + pnm.name + "</b><br>" + pnm.hometown);
  }
});

//This part of the is for the Find Your Twin Section
function findTwin() {
  const userAnswers = {
    snack: document.getElementById("snack").value,
    freeFood: document.getElementById("freeFood").value,
    season: document.getElementById("season").value
  };

  let bestMatch = null;
  let highestScore = -1;

  pnms.forEach(pnm => {
    let score = 0;

    if (pnm.twinAnswers.snack === userAnswers.snack) score++;
    if (pnm.twinAnswers.freeFood === userAnswers.freeFood) score++;
    if (pnm.twinAnswers.season === userAnswers.season) score++;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = pnm;
    }
  });

  document.getElementById("result").innerHTML = "Your Twin is <b>" + bestMatch.name + "</b> from " + bestMatch.hometown;
}
