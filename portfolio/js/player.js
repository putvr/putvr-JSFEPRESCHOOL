class Video {

  constructor(Element) {
    this.player = Element;
    this.video = document.querySelector('.player__video');
    this.playback = document.querySelector('.player__progress');

    this.playbackTimerID;
  }

  play() {
    this.player.classList.add('player--playing');
    this.video.play();

    this.playbackTimerID = setInterval(() => {
      const time = (this.video.currentTime / this.video.duration);
      this.playback.value = String(time * 100);
    }, 500);
  }

  pause() {
    this.player.classList.remove('player--playing');
    this.video.pause();

    clearInterval(this.playbackTimerID);
  }

  handlePlayClick() {
    if (this.video.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  handlePlaybackClick(event) {
    this.pause();
    const newTime = Math.floor(this.video.duration * event.target.value / 100);
    this.video.currentTime = newTime;
    this.play();
  }

  handleVolumeClick({
    target: {
      value
    }
  }) {
    this.video.volume = value;
  }

  handleMuteClick() {
    if (this.video.muted) {
      this.video.muted = false;
      this.player.classList.remove('player--muted');
    } else {
      this.video.muted = true;
      this.player.classList.add('player--muted');
    }
  }

}

export default Video;
