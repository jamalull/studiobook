// // Mengaktifkan atau menonaktifkan tombol "Lanjutkan Pemesanan" berdasarkan kondisi input
// function updateContinueButton() {
//   const continueButton = document.getElementById("continue-button");
//   continueButton.disabled = !isInputValid();
// }

// // Tambahkan event listener untuk input
// const inputs = document.querySelectorAll("input");
// inputs.forEach((input) => {
//   input.addEventListener("input", updateContinueButton);
// });

// // Tambahkan event listener untuk tombol "Lanjutkan Pemesanan"
// const continueButton = document.getElementById("continue-button");
// continueButton.addEventListener("click", () => {
//   if (isInputValid()) {
//     // Lakukan tindakan lanjutan saat tombol "Lanjutkan Pemesanan" diklik
//     alert("Melanjutkan pemesanan...");
//   }
// });

// // Tambahkan event listener untuk tombol "Batal"
// const cancelButton = document.getElementById("cancel-button");
// cancelButton.addEventListener("click", () => {
//   // Lakukan tindakan pembatalan saat tombol "Batal" diklik
//   alert("Membatalkan pemesanan...");
// });

// // Mengaktifkan atau menonaktifkan tombol "Lanjutkan Pemesanan" dan tombol "Batal"
// function updateButtonVisibility() {
//   const continueButton = document.getElementById("continue-button");
//   const cancelButton = document.getElementById("cancel-button");

//   if (isInputValid()) {
//     continueButton.style.display = "block"; // Menampilkan tombol Lanjutkan Pemesanan
//     cancelButton.style.display = "block"; // Menampilkan tombol Batal
//   } else {
//     continueButton.style.display = "none"; // Menyembunyikan tombol Lanjutkan Pemesanan
//     cancelButton.style.display = "block"; // Menampilkan tombol Batal
//   }
// }

// // Tambahkan event listener untuk input
// inputs.forEach((input) => {
//   input.addEventListener("input", updateButtonVisibility);
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const inputContainers = document.querySelectorAll(".input-container");
//   const continueButton = document.getElementById("continue-button");

//   // Function to check if all input fields are filled
//   function checkInputs() {
//     let allFilled = true;
//     inputContainers.forEach((container) => {
//       const input = container.querySelector("input");
//       if (input.value.trim() === "") {
//         allFilled = false;
//       }
//     });

//     if (allFilled) {
//       continueButton.disabled = false;
//     } else {
//       continueButton.disabled = true;
//     }
//   }

//   // Add an event listener for each input to check inputs on change
//   inputContainers.forEach((container) => {
//     const input = container.querySelector("input");
//     input.addEventListener("input", checkInputs);
//   });
// });
// cobaa
// document.addEventListener("DOMContentLoaded", function () {
//   const inputContainers = document.querySelectorAll(".input-container");
//   const continueButton = document.getElementById("continue-button");

//   // Function to check if all input fields are filled
//   function checkInputs() {
//     let allFilled = true;
//     inputContainers.forEach((container) => {
//       const input = container.querySelector("input");
//       if (input.value.trim() === "") {
//         allFilled = false;
//       }
//     }

//     // Enable or disable the "Lanjutkan Pemesanan" button based on input conditions
//     if (allFilled) {
//       continueButton.disabled = false;
//     } else {
//       continueButton.disabled = true;
//     }
//   }

//   // Add an event listener for each input to check inputs on change
//   inputContainers.forEach((container) => {
//     const input = container.querySelector("input");
//     input.addEventListener("input", checkInputs);
//   });

//   // Add an event listener for the "Lanjutkan Pemesanan" button
//   continueButton.addEventListener("click", () => {
//     if (!continueButton.disabled) {
//       // Perform further action when the "Lanjutkan Pemesanan" button is clicked
//       alert("Melanjutkan pemesanan...");
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const inputContainers = document.querySelectorAll(".input-container");
  const continueButton = document.getElementById("continue-button");

  // Function to check if all input fields are filled
  function checkInputs() {
    let allFilled = true;
    inputContainers.forEach((container) => {
      const input = container.querySelector("input");
      if (input.value.trim() === "") {
        allFilled = false;
      }
    });

    // Enable or disable the "Lanjutkan Pemesanan" button based on input conditions
    if (allFilled) {
      continueButton.disabled = false;
    } else {
      continueButton.disabled = true;
    }
  }

  // Add an event listener for each input to check inputs on change
  inputContainers.forEach((container) => {
    const input = container.querySelector("input");
    input.addEventListener("input", checkInputs);
  });

  // Add an event listener for the "Lanjutkan Pemesanan" button
  continueButton.addEventListener("click", () => {
    if (!continueButton.disabled) {
      // Perform further action when the "Lanjutkan Pemesanan" button is clicked
      alert("Melanjutkan pemesanan...");
    }
  });
});
