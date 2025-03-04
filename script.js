let douas = [];

// Charger les Douas depuis le fichier JSON
fetch("douas.json")
    .then(response => response.json())
    .then(data => {
        douas = data;
        setDailyDoua(); // Définir la Doua du Jour
    });

function getRandomDoua() {
    if (douas.length === 0) return;

    const randomIndex = Math.floor(Math.random() * douas.length);
    const doua = douas[randomIndex];

    const douaText = document.getElementById("doua-text");
    const douaTranslation = document.getElementById("doua-translation");

    // Animation fade-out
    douaText.classList.add("opacity-0", "translate-y-2");
    douaTranslation.classList.add("opacity-0", "translate-y-2");

    setTimeout(() => {
        douaText.textContent = doua.text;
        douaTranslation.textContent = doua.translation;

        // Animation fade-in
        douaText.classList.remove("opacity-0", "translate-y-2");
        douaTranslation.classList.remove("opacity-0", "translate-y-2");
        douaText.classList.add("opacity-100", "translate-y-0");
        douaTranslation.classList.add("opacity-100", "translate-y-0");

        // Mettre à jour le compteur
        let viewedCount = localStorage.getItem("douaCount") || 0;
        viewedCount++;
        localStorage.setItem("douaCount", viewedCount);
        document.getElementById("doua-counter").textContent = viewedCount;
    }, 300);
}

// ✅ Afficher une Doua du Jour avec stockage dans localStorage
function setDailyDoua() {
    if (douas.length === 0) return;

    const today = new Date().toISOString().split("T")[0]; // Obtenir la date du jour (YYYY-MM-DD)
    const storedDate = localStorage.getItem("dailyDouaDate");
    const storedDoua = localStorage.getItem("dailyDoua");

    if (storedDate === today && storedDoua) {
        // Utiliser la Doua stockée si la date est la même
        const dailyDoua = JSON.parse(storedDoua);
        document.getElementById("daily-doua-text").textContent = dailyDoua.text;
        document.getElementById("daily-doua-translation").textContent = dailyDoua.translation;
    } else {
        // Sélectionner une nouvelle Doua aléatoire et stocker la nouvelle date
        const index = Math.floor(Math.random() * douas.length);
        const dailyDoua = douas[index];

        document.getElementById("daily-doua-text").textContent = dailyDoua.text;
        document.getElementById("daily-doua-translation").textContent = dailyDoua.translation;

        localStorage.setItem("dailyDouaDate", today);
        localStorage.setItem("dailyDoua", JSON.stringify(dailyDoua));
    }
}

// ✅ Copier la Doua 📋
function copyDoua() {
    const douaText = document.getElementById("doua-text").textContent;
    navigator.clipboard.writeText(douaText).then(() => {
        alert("Doua copiée 📋 !");
    });
}
function toggleDouaList() {
  const douaListContainer = document.getElementById("doua-list-container");
  if (douaListContainer.classList.contains("hidden")) {
      displayDouaList();
      douaListContainer.classList.remove("hidden");
  } else {
      douaListContainer.classList.add("hidden");
  }
}

function displayDouaList() {
  const douaListElement = document.getElementById("doua-list");
  douaListElement.innerHTML = ""; // Vider la liste avant de l'afficher
  douas.forEach((doua, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="font-arabic text-lg">${doua.text}</span>  <br> <span class="italic">${doua.translation}</span>`;
      douaListElement.appendChild(li);
  });
}

