// Video modal: plays YouTube or Mux (Swimply) videos, only loading the player once it's opened

var MUX_PLAYER_SRC = "https://cdn.jsdelivr.net/npm/@mux/mux-player@3";

function openVideo(playerHtml) {
  document.getElementById("videoFrame").innerHTML = playerHtml;
  document.getElementById("videoModal").style.display = "block";
}

function openYouTube(videoId) {
  openVideo(
    '<iframe src="https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0" ' +
    'title="Video tour of the Barn at Pinegar Farms" ' +
    'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>');
}

function openMux(playbackId) {
  // Load the Mux player script the first time a Mux video is opened
  if (!document.getElementById("muxPlayerScript")) {
    var script = document.createElement("script");
    script.id = "muxPlayerScript";
    script.src = MUX_PLAYER_SRC;
    document.head.appendChild(script);
  }
  openVideo('<mux-player playback-id="' + playbackId + '" autoplay></mux-player>');
}

// Removing the player stops playback
function closeVideo() {
  document.getElementById("videoModal").style.display = "none";
  document.getElementById("videoFrame").innerHTML = "";
}

// Esc closes the video
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && document.getElementById("videoModal").style.display === "block") {
    closeVideo();
  }
});
