class Player{
    constructor(selector){
        this.player = document.querySelector(selector);
        this.video = this.player.querySelector('video');
        this.playVideo();
    }
    playVideo(){
        this.video.addEventListener('click', this.toggleVideo.bind(this));
        this.video.addEventListener('dblclick', this.toggleFullScreen.bind(this));
        this.video.addEventListener('loadedmetadata', this.setVideoTime.bind(this));
        this.video.addEventListener('timeupdate', this.timeUpdate.bind(this));
        this.player.querySelector('.play').addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.fullscreen').addEventListener('click', this.toggleFullScreen.bind(this));
        this.player.querySelector('.volume-mute').addEventListener('click', this.volumeMute.bind(this));
        this.player.querySelector('.volume-change').addEventListener('input', this.setVolume.bind(this));
        this.player.querySelector('.player__lines').addEventListener('click', this.setLinePose.bind(this));
        this.player.querySelector('.player__lines').addEventListener('dragover', this.setLinePose.bind(this));
        this.player.querySelector('.player-speed').addEventListener('input', this.playSpeed.bind(this));
    }
    toggleVideo(){
        this.on = !this.on;
        this.video[this.on ? 'play' : 'pause']();
        const playIcon = this.player.querySelector('.play .fas');
        playIcon.classList.toggle('fa-play', !this.on);
        playIcon.classList.toggle('fa-pause', this.on);
    }
    toggleFullScreen(){
        const full = !document.fullscreenElement;
        const fullIcon = this.player.querySelector('.fullscreen .fal')
        fullIcon.classList.toggle('fa-expand', !full)
        fullIcon.classList.toggle('fa-compress', full)
        if(full){
            this.player.requestFullscreen();
            this.player.querySelector('.player__lines').style.width = '80%'
        } else{
            document.exitFullscreen();
            this.player.querySelector('.player__lines').style.width = '53%'
        }
    }
    volumeMute(){
        this.isMuted = !this.isMuted;
        this.video.muted = this.isMuted;
        const volumeIcon = this.player.querySelector('.volume-mute .fas');
        volumeIcon.classList.toggle('fa-volume-up', !this.isMuted);
        volumeIcon.classList.toggle('fa-volume-mute', this.isMuted);
        const volume = this.player.querySelector('.volume-change');
        
        if(this.isMuted){
            volume.setAttribute('data-volume', volume.value);
            volume.value = 0;
        } else{
            volume.value = volume.getAttribute('data-volume');
            volume.removeAttribute('data-volume')
        }
    }
    setVolume(){
        this.video.volume = this.player.querySelector('.volume-change').value / 100;
    }
    setVideoTime(){
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.player__time').innerHTML = `0:00 / ${Math.floor(duration / 60)}:${duration % 60}`;
    }
    timeUpdate(){
        const duration = Math.floor(this.video.duration);
        const current = Math.floor(this.video.currentTime);
        const seconds = Math.floor(current % 60) < 10 ? `0${Math.floor(current % 60)}` : `${Math.floor(current % 60)}`;
        this.player.querySelector('.player__time').innerHTML = `${Math.floor(current / 60)}:${seconds} / ${Math.floor(duration / 60)}:${duration % 60}`;
        
        this.player.querySelector('.player__lines-current').style.width = `${current / duration * 100}%`;
    }
    setLinePose(event){
        const lineWidth = this.player.querySelector('.player__lines').clientWidth;
        const position = event.layerX;
        this.player.querySelector('.player__lines-current').style.width = `${position / lineWidth * 100}%`;
        this.video.currentTime = (position / lineWidth) * this.video.duration;
    }
    playSpeed(){
        this.video.playbackRate = this.player.querySelector('.player-speed').value;
    }
}

const player = new Player('.player');
console.log(player);