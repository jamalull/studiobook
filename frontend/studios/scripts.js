let menuOpen = document.querySelector(".menu-toggle");
let menuWrapper = document.querySelector(".menu-wrapper");

menuOpen.addEventListener("click", function () {
  menuOpen.classList.toggle("bx-x");
  menuOpen.classList.toggle("bxs-grid");
  menuWrapper.classList.toggle("active");
});

// Fungsi untuk membuat card
function createCard(title, rating, location, description) {
  const cardContainer = document.querySelector(".swiper-wrapper");

  const card = document.createElement("div");
  card.className = "swiper-slide card-produk";

  const cardImage = document.createElement("div");
  cardImage.className = "card-image";
  cardImage.innerHTML = `<img src="/img/studiomusic.jpg" alt="Card Image">`;

  const cardContent = document.createElement("div");
  cardContent.className = "detail-produk";

  const cardTitle = document.createElement("div");
  cardTitle.className = "title-card";
  cardTitle.innerHTML = `<h1>${title}</h1><p class="star"><i class="bx bxs-star"></i> ${rating}</p>`;

  const cardBody = document.createElement("div");
  cardBody.className = "body-card";
  cardBody.innerHTML = `<div class="location"><i class="bx bxs-map"></i>${location}</div><div class="studio">${description}</div>`;

  const cardButton = document.createElement("div");
  cardButton.className = "btn-produk";
  cardButton.innerHTML = '<a href="#">Sewa</a>';

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardBody);
  cardContent.appendChild(cardButton);

  card.appendChild(cardImage);
  card.appendChild(cardContent);

  cardContainer.appendChild(card);
}

// Loop sebanyak 18 kali
for (let i = 1; i <= 19; i++) {
  createCard(`Intan Music Studio ${i}`, 4.4, "Depok, Sleman", "Studio Music - 150k/<span>jam</span>");
}
