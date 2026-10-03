// Photo gallery: tabs and full size image modal with previous/next navigation

var galleryImages = [];
var galleryIndex = 0;

// Tabbed interface.
function openPics(evt, picName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(picName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Open the modal on the clicked image, navigating within that image's tab
function onClick(element) {
  galleryImages = Array.prototype.slice.call(element.closest(".tabcontent").getElementsByTagName("img"));
  galleryIndex = galleryImages.indexOf(element);
  showImage();
  document.getElementById("modal01").style.display = "block";
}

function showImage() {
  var image = galleryImages[galleryIndex];
  document.getElementById("img01").src = image.src;
  document.getElementById("caption").textContent = image.alt;
}

// Step forward (1) or back (-1), wrapping around at either end
function changeImage(step) {
  galleryIndex = (galleryIndex + step + galleryImages.length) % galleryImages.length;
  showImage();
}

function closeModal() {
  document.getElementById("modal01").style.display = "none";
}

function isModalOpen() {
  return document.getElementById("modal01").style.display === "block";
}

// Keyboard: left/right arrows to navigate, Esc to close
document.addEventListener("keydown", function(event) {
  if (!isModalOpen()) return;
  if (event.key === "ArrowLeft") {
    changeImage(-1);
  } else if (event.key === "ArrowRight") {
    changeImage(1);
  } else if (event.key === "Escape") {
    closeModal();
  }
});

// Touch: swipe left/right to navigate
var touchStartX = null;
var modal = document.getElementById("modal01");

modal.addEventListener("touchstart", function(event) {
  touchStartX = event.changedTouches[0].clientX;
});

modal.addEventListener("touchend", function(event) {
  if (touchStartX === null) return;
  var distance = event.changedTouches[0].clientX - touchStartX;
  touchStartX = null;
  if (Math.abs(distance) > 50) {
    changeImage(distance < 0 ? 1 : -1);
  }
});
