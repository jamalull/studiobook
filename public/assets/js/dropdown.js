// Mengambil tombol dropdown dan menu dropdown
const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");
// const dropdown = document.getElementById("dropdown");
const dropdown = document.querySelector(".dropdown");

// Mengatur perilaku dropdown saat tombol diklik
dropdownButton.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});