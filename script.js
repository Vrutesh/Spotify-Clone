let currentSong = new Audio();
let songs;

async function getSongs() {
  let a = await fetch("assets/songs/");
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  let songs = [];

  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

const playMusic = (track, pause = false) => {
  currentSong.src = "assets/songs/" + track;
  if (!pause) {
    currentSong.play();
    play.src = "assets/pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  songs = await getSongs();
  playMusic(songs[0], true);

  let songUL = document
    .querySelector(".song-library")
    .getElementsByTagName("ul")[0];

  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
        <img class="invert" src="assets/music.svg" alt="">
        <div class="info">
                    <div>${song}</div>
                    <div>Arjit Singh</div>
                  </div>
                  <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="assets/play.svg" alt="">
                  </div> </li>`;
  }
  Array.from(
    document.querySelector(".song-library").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  //  event listener to play, pause, next & previous

  const play = document.getElementById("play");
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "assets/pause.svg";
    } else {
      currentSong.pause();
      play.src = "assets/play.svg";
    }
  });

  // listen event on song duration

  currentSong.addEventListener("timeupdate", () => {
    const currentTimeFormatted = secondsToMinutesSeconds(
      currentSong.currentTime
    );
    const durationFormatted = secondsToMinutesSeconds(currentSong.duration);
    document.querySelector(
      ".songtime"
    ).innerHTML = `${currentTimeFormatted}/${durationFormatted}`;

    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  function secondsToMinutesSeconds(time) {
    if (isNaN(time) || time < 0) {
      return "00:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  //event listener on previous and next button
  let previousbtn = document.getElementById("previous");
  previousbtn.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });
  let nextbtn = document.getElementById("next");
  nextbtn.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  //event listener to volume
  let range = document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentSong.volume = parseInt(e.target.value) / 100;
    });

  const volumecut = document.querySelector(".volumeicon");

  volumecut.addEventListener("click", () => {
    if (currentSong.volume > 0) {
      currentSong.volume = 0; // Mute the volume (set to 0%)
      volumecut.src = "assets/volumecut.svg";
    } else {
      currentSong.volume = 1;
      volumecut.src = "assets/volume.svg";
    }
  });
}

main();

// login and signup

let login = document.getElementById("login").addEventListener("click", () => {
  window.location.href = "login.html";
});

let signup = document.getElementById("signup").addEventListener("click", () => {
  window.location.href = "signup.html";
});
