let map;
let markers = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    displayProfiles();
    setupTwinFinder();
    setupMusicPlayer();
});

// This section is for the map part of the website
function initializeMap() {
    // Creates a map centered on the USA
    map = L.map('worldMap').setView([39.8283, -98.5795], 4);
  
    // Add markers for each PNM's hometown
    pnmData.forEach(pnm => {
        if (pnm.hometown && pnm.hometown.lat && pnm.hometown.lng) {
            const marker = L.marker([pnm.hometown.lat, pnm.hometown.lng])
                .addTo(map)
                .bindPopup(`<b>${pnm.firstName} ${pnm.lastName}</b><br>${pnm.hometown.city}, ${pnm.hometown.state}`);
            markers.push(marker);
        }
    });

    // Fit map to show all markers if there are any
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}


// Display profile cards
function displayProfiles() {
    const profilesGrid = document.getElementById('profilesGrid');
    profilesGrid.innerHTML = '';

    pnmData.forEach(pnm => {
        const card = createProfileCard(pnm);
        profilesGrid.appendChild(card);
    });
}


//Creates the profile card elemnt for each pnm
function createProfileCard(pnm) {
    const card = document.createElement('div');
    card.className = 'profile-card';

    let html = '';
    
    // Profile image
    if (pnm.image) {
        html += `<img src="${pnm.image}" alt="${pnm.name}" class="profile-image">`;
    } else {
        html += `<div class="profile-image" style="background-color: #800020; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; font-weight: bold;">${pnm.name.charAt(0)}</div>`;
    }

    // Name
    html += `<h3 class="profile-name">${pnm.name} </h3>`;

    // Major
    if (pnm.major) {
        html += `<p class="profile-info"><strong>Major:</strong> ${pnm.major}</p>`;
    }

    // Graduation year
    if (pnm.graduationYear) {
        html += `<p class="profile-info"><strong>Graduation:</strong> ${pnm.graduationYear}</p>`;
    }

    // Theme song
    if (pnm.themeSong) {
        html += `<div class="profile-theme-song">
            <button onclick="playThemeSong('${pnm.name}', '${pnm.themeSong}')" class="play-btn">
                ▶️ Play Theme Song
            </button>
        </div>`;
    }

    card.innerHTML = html;
    return card;
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
