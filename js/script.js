import App from "../js/app.js";
import StorgeToDo from "../js/StorgeToDo.js";

// nav show txt
const nav = document.querySelector("nav"),
  txts = document.querySelectorAll(".txt");
nav.addEventListener("mouseenter", () => {
  txts.forEach((txt) => {
    setTimeout(() => {
      txt.style.display = "inline";
    }, 50);
  });
});
document.querySelector("nav").addEventListener("mouseleave", () => {
  txts.forEach((txt) => {
    txt.style.display = "none";
  });
  categoryNav.classList.remove("show");
});

// category - nav;
const categoryBtn = document.getElementById("category-btn"),
  categoryNav = document.getElementById("category-nav");
categoryBtn.addEventListener("click", () => {
  categoryNav.classList.toggle("show");
});

const root = document.querySelector(".container");

const app = new App(root);

// nav completed & all (task)
const completedTask_btn = document.getElementById("completedTask"),
  AllTask = document.getElementById("AllTask");

completedTask_btn.addEventListener("click", () => {
  const boxs = root.querySelectorAll(".task-box");
  boxs.forEach((box) => {
    if (!box.classList.contains("completed")) box.style.display = "none";
  });
});

AllTask.addEventListener("click", () => {
  const boxs = root.querySelectorAll(".task-box");
  boxs.forEach((box) => {
    if (!box.classList.contains("completed")) box.style.display = "grid";
  });
});

// nav category

let tasks = StorgeToDo.getData("task"),
  taskCategory = new Set();
tasks.forEach((task) => {
  taskCategory.add(task.title);
});

let li = "";
taskCategory.forEach((cat) => {
  li += `<li data-cat="${cat}">${cat}</li>`;
});
categoryNav.innerHTML = li;

// nav category btn
let categoryNav_btn = categoryNav.querySelectorAll("li");

categoryNav_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const boxs = root.querySelectorAll(".task-box");
    boxs.forEach((box) => {
      if (box.dataset.title != btn.dataset.cat) {
        box.style.display = "none";
      } else {
        box.style.display = "block";
      }
    });
  });
});

// togle btn

const togle_btn = document.querySelector(".togle-nav"),
  navDiv = document.querySelector(".nav");

togle_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  navDiv.classList.toggle("show_nav");

  txts.forEach((txt) => {
    setTimeout(() => {
      txt.style.display = "inline";
    }, 50);
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("x")) {
    navDiv.classList.remove("show_nav");
  }
});
