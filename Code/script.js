console.log("Let's write Javascript Here")


async function getSongs(){
    let a = await fetch("http://127.0.0.1:5501/Code/songs/")
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    // console.log(as)
    let songs =[]
    
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
        
    }
    return songs
}


async function main(){
    let songs = await getSongs()
    console.log(songs)

    let songUL= document.querySelector(".song-library").getElementsByTagName("ul")[0]
    // console.log(songUL)
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        <img class="invert" src="/Code/assets/music.svg" alt="">
        <div class="info">
                    <div>${song}</div>
                    <div>Arjit Singh</div>
                  </div>
                  <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="/Code/assets/play.svg" alt="">
                  </div>
                
        
        
        </li>`
    }

    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata", ()=>{
        let duration= audio.duration
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    })
}

main()
