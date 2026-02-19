function sayHello() {
  alert("Welcome to the PNM Class Website!");
}

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
