"use strict";

const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function check() {
    if (this.classList.contains("active")) {
      hideEl();
    } else {
      showEl();
    }

    function showEl() {
      hideEl();
      this.classList.toggle("active");
      acc[i].nextElementSibling.classList.toggle("active");
      if (acc[i].nextElementSibling.style.maxHeight) {
        acc[i].nextElementSibling.style.maxHeight = null;
      } else {
        acc[i].nextElementSibling.style.maxHeight = acc[i].nextElementSibling.scrollHeight + "px";
      }
    }
  });
}

function hideEl() {
  for (let i = 0; i < acc.length; i++) {
    acc[i].classList.toggle("active", false);
    acc[i].nextElementSibling.classList.toggle("active", false);
    acc[i].nextElementSibling.style.maxHeight = null;
  }
}
