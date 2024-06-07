document.addEventListener("DOMContentLoaded", () => {
  //modificarea stilului unui element
  document.getElementById("nav").style.backgroundColor = "#e3e6f3";

  // Cod pentru bara de navigare pe ecrane mici
  const bar = document.getElementById("bar");
  const close = document.getElementById("close");
  const nav = document.getElementById("navbar");

  if (bar) {
    bar.addEventListener("click", () => {
      nav.classList.add("active");
    });
  }

  if (close) {
    close.addEventListener("click", (e) => {
      e.preventDefault();
      nav.classList.remove("active");
    });
  }

  // Cod pentru butonul "Shop Now"
  const buton = document.getElementById("shop_now");
  if (buton) {
    buton.addEventListener("click", () => {
      window.location.href = "/shop";
    });
  }

  // Cod pentru imaginea produsului
  const product = document.getElementById("clickable-image");
  if (product) {
    product.addEventListener("click", () => {
      window.location.href = "/sproduct";
    });
  }

  // Cod pentru schimbarea imaginii principale pe pagina /sproduct
  const MainImg = document.getElementById("mainImage");
  const smallImg = document.getElementsByClassName("small-img");

  if (MainImg && smallImg) {
    for (let i = 0; i < smallImg.length; i++) {
      smallImg[i].onclick = function () {
        MainImg.src = this.src;
      };
    }
  }

  // Cod pentru dropdown menu
  let subMenu = document.getElementById("subMenu");
  let userIcon = document.getElementById("user");

  if (userIcon) {
    userIcon.addEventListener("click", function () {
      subMenu.classList.toggle("open-menu");
    });
  }

  // Setarea clasei active pe linkul corespunzător din navbar
  const navLinks = document.querySelectorAll("#navbar a");
  const currentPath = window.location.pathname;

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Cod pentru countdown
  const countdownElement = document.getElementById("countdown");

  if (countdownElement) {
    const launchDate = new Date("2024-12-01T00:00:00");

    function updateCountdown() {
      // Data și ora curentă
      const now = new Date();

      // Diferența în milisecunde
      const timeDifference = launchDate - now;

      // Calculăm zilele, orele, minutele și secundele rămase
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Afișăm rezultatul
      countdownElement.textContent = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

      // Actualizăm la fiecare secundă
      setTimeout(updateCountdown, 1000);
    }

    // Inițializăm funcția de actualizare a countdown-ului
    updateCountdown();
  }

  //Cod pt mesajul de pop-up cand apasam butonul add to cart folosind setTimeout
  const addToCartButton = document.getElementById("addToCartButton");
  const popupMessage = document.getElementById("popupMessage");

  // Verificăm dacă ambele elemente există înainte de a le utiliza
  if (addToCartButton && popupMessage) {
    addToCartButton.addEventListener("click", function () {
      // Show the pop-up message
      popupMessage.classList.add("show");

      // Hide the pop-up message after 3 seconds
      setTimeout(function () {
        popupMessage.classList.remove("show");
      }, 3000);
    });
  } else {
    console.log("Elementele nu au fost găsite în document.");
  }

  ///butonul de la contact page sa fie colorat at cand e apasat
  var contactForm = document.getElementById("contactForm");
  var contactButton = document.getElementById("contactButton");

  // Verifică dacă formularul există
  if (contactForm) {
    // Adaugă un ascultător de eveniment pentru evenimentul de submit al formularului
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Previne comportamentul implicit de trimitere a formularului

      // Creați un element de mesaj pentru mulțumire
      var thankYouMessage = document.createElement("div");
      thankYouMessage.textContent =
        "Thank you for your feedback! You'll be redirected shortly.";
      thankYouMessage.classList.add("thank-you-message");

      // Adăugați elementul de mesaj la DOM
      document.body.appendChild(thankYouMessage);

      // Setează un interval pentru a schimba stilul butonului la intervale regulate
      var interval = setInterval(function () {
        // Schimbă culoarea bordurii butonului cu o culoare aleatoare
        contactButton.style.borderColor = getRandomColor();
      }, 100); // Schimbă culoarea la fiecare 100 de milisecunde (adică 10 ori pe secundă)

      // După un anumit timp (de exemplu, 3000 milisecunde), oprește intervalul pentru a opri animația și revine la culoarea inițială
      setTimeout(function () {
        clearInterval(interval); // Oprire interval
        contactButton.style.borderColor = ""; // Revenire la culoarea implicită a bordurii butonului
      }, 3000); // Animarea va dura 3 secunde

      // Redirecționați utilizatorul către pagina principală după 10 secunde
      setTimeout(function () {
        window.location.href = "/home";
      }, 3010);
    });
  } else {
    console.log("Elementul form nu a fost găsit în document.");
  }

  // Funcția pentru a genera o culoare aleatoare în format hexadecimal
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //Stergerea elementelor html(stergem comentarii)
  var closeIcons = document.querySelectorAll(".fa-regular.fa-circle-xmark");

  closeIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      var listItem = icon.closest("li");
      listItem.remove();
    });
  });
});
