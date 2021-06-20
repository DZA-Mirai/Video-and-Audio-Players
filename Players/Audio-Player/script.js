class Player{
    constructor(selector){
        this.player = document.querySelector(selector);
        this.audio = this.player.querySelector('audio');
        this.playAudio();
    }
    playAudio(){
        this.audio.addEventListener('loadedmetadata', this.setAudioTime.bind(this));
        this.audio.addEventListener('timeupdate', this.timeUpdate.bind(this));
        this.player.querySelector('.play').addEventListener('click', this.toggleAudio.bind(this));
        this.player.querySelector('.volume-mute').addEventListener('click', this.volumeMute.bind(this));
        this.player.querySelector('.volume-change').addEventListener('input', this.setVolume.bind(this));
        this.player.querySelector('.player__lines').addEventListener('click', this.setLinePose.bind(this));
        this.player.querySelector('.player__lines').addEventListener('dragover', this.setLinePose.bind(this));
        this.player.querySelector('.player-speed').addEventListener('input', this.playSpeed.bind(this));
    }
    toggleAudio(){
        this.on = !this.on;
        this.audio[this.on ? 'play' : 'pause']();
        const playIcon = this.player.querySelector('.play .fas');
        playIcon.classList.toggle('fa-play', !this.on);
        playIcon.classList.toggle('fa-pause', this.on);
    }
    volumeMute(){
        this.isMuted = !this.isMuted;
        this.audio.muted = this.isMuted;
        const volumeIcon = this.player.querySelector('.volume-mute .fas');
        volumeIcon.classList.toggle('fa-volume-up', !this.isMuted);
        volumeIcon.classList.toggle('fa-volume-mute', this.isMuted);
        const volume = this.player.querySelector('.volume-change');
        if(this.isMuted){
            volume.setAttribute('data-volume', volume.value);
            volume.value = 0;
        } else{
            volume.value = volume.getAttribute('data-volume');
            volume.removeAttribute('data-volume');
        }
    }
    setVolume(){
        this.audio.volume = this.player.querySelector('.volume-change').value / 100;
    }
    setAudioTime(){
        const duration = Math.floor(this.audio.duration);
        this.player.querySelector('.player__time').innerHTML = `0:00 / ${Math.floor(duration / 60)}:${duration % 60}`;
    }
    timeUpdate(){
        const duration = Math.floor(this.audio.duration);
        const current = Math.floor(this.audio.currentTime);
        const seconds = (current % 60) >= 10 ? current % 60 : `0${current % 60}`;
        this.player.querySelector('.player__time').innerHTML = `${Math.floor(current / 60)}:${seconds} / ${Math.floor(duration / 60)}:${duration % 60}`;
        
        this.player.querySelector('.player__lines-current').style.width = `${(current / duration) * 100}%`;
    }
    setLinePose(event){
        const lineWidth = this.player.querySelector('.player__lines').clientWidth;
        const position = event.layerX;
        this.player.querySelector('.player__lines-current').style.width = `${(position / lineWidth) * 100}%`;
        this.audio.currentTime = (position / lineWidth) * this.audio.duration;
    }
    playSpeed(){
        this.audio.playbackRate = this.player.querySelector('.player-speed').value;
    }
}


const player = new Player('.player');
console.log(player);