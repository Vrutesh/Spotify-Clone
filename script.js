let currentSong = new Audio();
let songs = [];

async function getSongs() {
  try {
    const response = await fetch("/assets/songs/");
    const html = await response.text();
    const div = document.createElement("div");
    div.innerHTML = html;
    const as = div.querySelectorAll("a");

    as.forEach(element => {
      if (element.href.endsWith(".mp3")) {
        songs.push(element.href.split("/songs/")[1]);
      }
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
}

const playMusic = (track, pause = false) => {
  currentSong.src = "/assets/songs/" + track;
  if (!pause) {
    currentSong.play();
    play.src = "assets/pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  await getSongs();
  playMusic(songs[0], true);

  const songUL = document.querySelector(".song-library ul");

  const songsHTML = songs.map(song => `
    <li>
      <img class="invert" src="assets/music.svg" alt="">
      <div class="info">
        <div>${song}</div>
        <div>Arjit Singh</div>
      </div>
      <div class="playnow">
        <span>Play Now</span>
        <img class="invert" src="assets/play.svg" alt="">
      </div>
    </li>`).join('');

  songUL.innerHTML = songsHTML;

  songUL.addEventListener("click", (event) => {
    if (event.target.closest('li')) {
      const songName = event.target.closest('li').querySelector(".info div").innerText.trim();
      playMusic(songName);
    }
  });

  // Event listeners for play, pause, previous, next, volume

  // Time update event listener

  // Seekbar event listener

  // Volume event listener
}

main();

// Login and signup redirection

document.getElementById("login").addEventListener("click", () => {
  window.location.href = "login.html";
});

document.getElementById("signup").addEventListener("click", () => {
  window.location.href = "signup.html";
});
