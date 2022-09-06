/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navOppen = document.getElementById("nav-oppen"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navOppen) {
  navOppen.addEventListener("click", () => {
    navMenu.classList.add("navigation-active");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("navigation-active");
  });
}

/*===== MENU HIDDEN if clic outside =====*/
document.addEventListener("click", (e) => {
  const clicUp = e.target;
  if (clicUp !== navMenu) {
    if (navMenu.classList.contains("navigation-active")) {
      navMenu.classList.remove("navigation-active");
    }
  }
});

// // stop propagation when click in the manu
navOppen.onclick = function (e) {
  e.stopPropagation();
};

/*=============== REMOVE MENU MOBILE ===============*/
// const navLink = document.querySelectorAll('.nav-link');

// function linkAction() {
//     const navMenu = document.getElementById('nav-menu');
//     // When we click on each nav__link, we remove the show-menu class
//     navMenu.classList.remove('navigation-active')
// }
// navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const navBox = document.getElementById("nav-box");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) {
    navBox.classList.add("nav-box-black");
  } else {
    navBox.classList.remove("nav-box-black");
  }
}
window.addEventListener("scroll", scrollHeader);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scrollUp");
  // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 200) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-item a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav-item a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true
});

sr.reveal(`.header-img `, { delay: 600 });
sr.reveal(``, { delay: 700 });
sr.reveal(`.home__img`, { delay: 900, origin: "top" });

sr.reveal(`.products__card, .footer__logo, .footer__content, .footer__copy`, {
  origin: "top",
  interval: 100,
});
sr.reveal(`.sponser-img, .discount__animate`, {
  origin: "left",
  interval: 100,
});
sr.reveal(`.sponser-img-2, .discount__img`, { origin: "right" });
sr.reveal(`.case__img`, { origin: "top" });
sr.reveal(`.case__data`);
