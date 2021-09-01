const data = [
  {
    artist: "Benjamin Tissot (also known as Bensound)",
    songTitle: "Buddy",
    song: "./songs/bensound-buddy.mp3",
    coverImage:
      "https://images.unsplash.com/photo-1549937915-3dd443a3583f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80",
  },
  {
    artist: "Benjamin Tissot (also known as Bensound)",
    songTitle: "Creative minds",
    song: "./songs/bensound-creativeminds.mp3",
    coverImage:
      "https://images.unsplash.com/photo-1608403315268-764ed28bcb28?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
    artist: "Benjamin Tissot (also known as Bensound)",
    songTitle: "Cute",
    song: "./songs/bensound-cute.mp3",
    coverImage:
      "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
  },
];

window.onload = () => {
  let musicPlayer = new MusicPlayer();
  let play_event = document.querySelector("#play_event");
  play_event.addEventListener("click", () => {
    musicPlayer.playAndPause();
  });
  let pre_event = document.querySelector("#pre_event");
  pre_event.addEventListener("click", () => {
    musicPlayer.pre();
  });
  let next_event = document.querySelector("#next_event");
  next_event.addEventListener("click", () => {
    musicPlayer.next();
  });
};

class MusicPlayer {
  toggle = true;
  currentIndex = 0;

  constructor() {
    this.audio = document.getElementById("audio");
    this.artist = document.querySelector(".artist");
    this.songTitle = document.querySelector(".song-title");
    this.coverImage = document.querySelector(".album-cover-image");
    this.setCurrentSong();
    this.setCurrentElements();
  }
  playAndPause() {
    if (this.toggle) {
      this.audio.play();
      this.toggle = false;
      HelperElement.setupPlayorPauseElement("fa-pause-circle");
      this.rotateCoverPicture();
    } else {
      this.audio.pause();
      this.toggle = true;
      HelperElement.setupPlayorPauseElement("fa-play-circle");
      this.pauseCoverPicture();
    }
  }
  pre() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = data.length - 1;
    }
    this.setCurrentSong();
    this.setCurrentElements();
    this.forcePlay();
  }
  next() {
    this.currentIndex++;
    if (this.currentIndex > data.length - 1) {
      this.currentIndex = 0;
    }
    this.setCurrentSong();
    this.setCurrentElements();
    this.forcePlay();
  }

  setCurrentElements() {
    this.artist.innerHTML = data[this.currentIndex].artist;
    this.songTitle.innerHTML = data[this.currentIndex].songTitle;
    this.coverImage.setAttribute("src", data[this.currentIndex].coverImage);
  }

  forcePlay() {
    this.toggle = true;
    this.playAndPause();
  }

  setCurrentSong() {
    this.audio.setAttribute("src", data[this.currentIndex].song);
  }

  rotateCoverPicture() {
    this.coverImage.style.animation = "rotateFrame 4s linear infinite";
  }
  pauseCoverPicture() {
    this.coverImage.style.animationPlayState = "paused";
  }
}

class HelperElement {
  static setupPlayorPauseElement(icon) {
    let play_event = document.getElementById("play_event");
    play_event.innerHTML = "";
    play_event.append(HelperElement.createPauseOrPlayElement(icon));
  }

  static createPauseOrPlayElement(icon) {
    let pause = document.createElement("i");
    pause.classList.add("fas", icon);
    return pause;
  }
}
