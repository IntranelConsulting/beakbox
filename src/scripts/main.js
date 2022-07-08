console.clear();

var app = function () {
  let leftButton;
  let rightButton;
  let thumbnails;
  let thumbnail0;
  let thumbnail1;
  let thumbnail2;
  let thumbnail3;
  let thumbnail4;
  let image;
  let images = [
    "/imgs/gallery-1.jpg",
    "/imgs/gallery-2.jpg",
    "/imgs/gallery-3.jpg",
    "/imgs/gallery-4.jpg",
    "/imgs/gallery-5.jpg",
    "/imgs/gallery-6.jpg",
    "/imgs/gallery-7.JPG",
    "/imgs/gallery-8.JPG",
    "/imgs/gallery-9.JPG",
    "/imgs/gallery-10.JPG",
  ];
  let current;

  const init = function () {
    leftButton = document.querySelector("#arrow-left");
    rightButton = document.querySelector("#arrow-right");
    thumbnails = document.querySelector("#gallery-thumbnails").children;
    thumbnail0 = document.querySelector("#gallery-thumbnails").children[0];
    thumbnail1 = document.querySelector("#gallery-thumbnails").children[1];
    thumbnail2 = document.querySelector("#gallery-thumbnails").children[2];
    thumbnail3 = document.querySelector("#gallery-thumbnails").children[3];
    thumbnail4 = document.querySelector("#gallery-thumbnails").children[4];
    thumbnail5 = document.querySelector("#gallery-thumbnails").children[5];
    thumbnail6 = document.querySelector("#gallery-thumbnails").children[6];
    thumbnail7 = document.querySelector("#gallery-thumbnails").children[7];
    thumbnail8 = document.querySelector("#gallery-thumbnails").children[8];
    thumbnail9 = document.querySelector("#gallery-thumbnails").children[9];
    image = document.querySelector("#image-content");
    current = 0;

    applyListeners();
    changeThumbnail(current);
  };

  const applyListeners = function () {
    leftButton.addEventListener("click", function () {
      prevImage();
    });
    rightButton.addEventListener("click", function () {
      nextImage();
    });
    thumbnail0.addEventListener("click", function () {
      toImage(0);
    });
    thumbnail1.addEventListener("click", function () {
      toImage(1);
    });
    thumbnail2.addEventListener("click", function () {
      toImage(2);
    });
    thumbnail3.addEventListener("click", function () {
      toImage(3);
    });
    thumbnail4.addEventListener("click", function () {
      toImage(4);
    });
    thumbnail5.addEventListener("click", function () {
      toImage(5);
    });
    thumbnail6.addEventListener("click", function () {
      toImage(6);
    });
    thumbnail7.addEventListener("click", function () {
      toImage(7);
    });
    thumbnail8.addEventListener("click", function () {
      toImage(8);
    });
    thumbnail9.addEventListener("click", function () {
      toImage(9);
    });
  };

  const nextImage = function () {
    current = (current + 1) % images.length;
    image.style.backgroundImage = "url(" + images[current] + ")";
    changeThumbnail(current);
  };

  const prevImage = function () {
    current = (current + images.length - 1) % images.length;
    image.style.backgroundImage = "url(" + images[current] + ")";
    changeThumbnail(current);
  };

  const toImage = function (index) {
    current = index;
    image.style.backgroundImage = "url(" + images[current] + ")";
    changeThumbnail(current);
  };

  const changeThumbnail = function (index) {
    for (i = 0; i < thumbnails.length; i++) {
      thumbnails[i].classList.remove("selected-image");
    }
    thumbnails[index].classList.add("selected-image");
  };

  init();
};

if (document.querySelector("#gallery-thumbnails")) {
  app();
}

// * Replace div elements of embedded videos with video thumbnails and a play button *//

function SwapIframe(div) {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", "https://www.youtube.com/embed/" + div.dataset.id + "?autoplay=1&rel=0");
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
  div.replaceWith(iframe);
}

function initYouTubeVideos() {
  var playerElements = document.getElementsByClassName("youtube-player");
  for (var n = 0; n < playerElements.length; n++) {
    var videoId = playerElements[n].dataset.id;
    var div = document.createElement("div");
    div.setAttribute("data-id", videoId);
    var thumbNode = document.createElement("img");
    thumbNode.src = "//i.ytimg.com/vi/ID/hqdefault.jpg".replace("ID", videoId);
    div.appendChild(thumbNode);
    var playButton = document.createElement("div");
    playButton.setAttribute("class", "play");
    div.appendChild(playButton);
    div.onclick = function () {
      SwapIframe(this);
    };
    playerElements[n].appendChild(div);
  }
}

document.addEventListener("DOMContentLoaded", initYouTubeVideos);
