// -----------------------
// creat progressscrolling
// -----------------------
let progress = document.querySelector(".pregress");
document.onscroll = function () {
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let currentScroll = window.scrollY;
  progress.style.width = `${(currentScroll * 100) / height}%`;
};

// =========================
document.addEventListener("DOMContentLoaded", function () {
  var myElement = document.querySelector("#header");
  var headroom = new Headroom(myElement);
  headroom.init();
});
