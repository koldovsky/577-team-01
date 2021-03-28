"use strict";

const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    hideAll();
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("active");
    if (this.nextElementSibling.style.maxHeight) {
      this.nextElementSibling.style.maxHeight = null;
    } else {
      this.nextElementSibling.style.maxHeight =
        this.nextElementSibling.scrollHeight + "px";
    }
  });
}
function hideAll() {
  for (let i = 0; i < acc.length; i++) {
    acc[i].classList.toggle("active", false);
    acc[i].nextElementSibling.classList.toggle("active", false);
    acc[i].nextElementSibling.style.maxHeight = null;
}
}

