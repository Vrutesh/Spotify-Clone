console.log("Let's write Javascript Here");
let currentSong = new Audio();

async function getSongs() {
  let a = await fetch("/Code/songs/");
  let response = await a.text();
  // console.log(response)
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  // console.log(as)
  let songs = [];

  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

const playMusic = (track, pause=false) => {
  currentSong.src = "/Code/songs/" + track;
  if(!pause){
    currentSong.play();
    play.src = "assets/pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track)
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
};


async function main() {
  let songs = await getSongs();
  playMusic(songs[0], true)

  let songUL = document
    .querySelector(".song-library")
    .getElementsByTagName("ul")[0];
  // console.log(songUL)
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
        <img class="invert" src="/Code/assets/music.svg" alt="">
        <div class="info">
                    <div>${song}</div>
                    <div>Arjit Singh</div>
                  </div>
                  <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="/Code/assets/play.svg" alt="">
                  </div> </li>`;
  }
  Array.from(
    document.querySelector(".song-library").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
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
    console.log(currentSong.currentTime, currentSong.duration);
    const currentTimeFormatted = secondsToMinutesSeconds(currentSong.currentTime);
    const durationFormatted = secondsToMinutesSeconds(currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${currentTimeFormatted}/${durationFormatted}`;
});

function secondsToMinutesSeconds(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

}

main();



// login and signup 

let login = document.getElementById("login").addEventListener("click", () => {
  window.location.href = "login.html";
});

let signup = document.getElementById("signup").addEventListener("click", () => {
  window.location.href = "signup.html";
});
