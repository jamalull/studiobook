let menuOpen = document.querySelector(".menu-toggle");
let menuWrapper = document.querySelector(".menu-wrapper");

menuOpen.addEventListener("click", function () {
  menuOpen.classList.toggle("bx-x");
  menuOpen.classList.toggle("bxs-grid");
  menuWrapper.classList.toggle("active");
});

var swiper = new Swiper(".mySwiper", {
  grabCursor: true,
  centeredSlides: false,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteractoin: false,
  },
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 0,
    modifier: 1,
    slideShadows: true,
  },
  navigation: {
    nextEl: ".bxs-chevron-right-circle",
    prevEl: ".bxs-chevron-left-circle",
  },
});

var swiper = new Swiper(".mySwiperTesti", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

// Mengambil tombol dropdown dan menu dropdown
const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdown = document.querySelector(".dropdown");

// Mengatur perilaku dropdown saat tombol diklik
dropdownButton.addEventListener("click", function () {
  dropdown.classList.toggle("active");
});
