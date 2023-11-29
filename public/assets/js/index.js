// AUTH PAGES
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

// Check conditional if not null lets to functionality work well.
if(sign_in_btn){
  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });
}
if(sign_in_btn2){
  sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
  });
}
if(sign_up_btn){
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });
}
if(sign_up_btn2){
  sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
  });
}


// // Mengambil tombol dropdown dan menu dropdown
// const dropdownButton = document.querySelector("#dropdownButton");
// const dropdownMenu = document.querySelector("#dropdownMenu");
// // const dropdown = document.getElementById("dropdown");
// const dropdown = document.querySelector(".dropdown");

// if(dropdownButton){
//   // Mengatur perilaku dropdown saat tombol diklik
//   dropdownButton.addEventListener("click", () => {
//     dropdown.classList.toggle("active");
//   });
// }

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

// DETAIL STUDIO PAGES
let increment = document.getElementById("btn-plus");
let decrement = document.getElementById("btn-minus");
let duration = parseInt(document.getElementById("duration").value);
let price = parseInt(document.getElementById("priceStudio").value);
let showDuration = document.getElementById("hourRentStudio");
let showTotalPrice = document.getElementById("showTotalPrice");
let totalPayment = document.getElementById("totalPayment");

// Payment Page
let subtotal = document.getElementById("subtotal");
let total = document.getElementById("total");


const calculatePriceAfterFee = () => {
  let fee = subtotal.value + (subtotal.value * 0.1);
  total.innerHTML = fee;
  // return total;
};

const calculatePrice = (durationPackage) => {
  return durationPackage * price;
};

const toRupiah = (num) => {
  return  new Intl.NumberFormat("id-ID", { style: "currency" , currency: "IDR" }).format(num);
};


if(increment){
  increment.addEventListener("click", () => {
    duration += 1;
    console.log(duration);
    document.getElementById("duration").value = duration;
    
    // calculatePrice(duration);
    let total = calculatePrice(duration);
    console.log(total);
    showDuration.innerHTML = duration + " jam";
    showTotalPrice.innerHTML = toRupiah(total);
    totalPayment.value = total;

    decrement.disabled = false;
    if(duration == 4){
      increment.disabled = true;
    }
  });
  
}
if(decrement){
  if(duration == 0){
    decrement.disabled = true;
  }
  decrement.addEventListener("click", () => {
    duration -= 1;
    console.log(duration);
    document.getElementById("duration").value = duration; 
    
    // calculatePrice(duration);
    let total = calculatePrice(duration);
    console.log(total);
    showDuration.innerHTML = duration + " jam";
    showTotalPrice.innerHTML = toRupiah(total);
    totalPayment.value = total;

    increment.disabled = false;
    if(duration == 0){
      decrement.disabled = true;
    }
  });
}