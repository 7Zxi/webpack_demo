const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const open = document.getElementById('open');
const close = document.getElementById('close');
const snap = document.getElementById('snap');
const ctx = canvas.getContext('2d');
let mediaStream = null;

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia; //获取媒体对象（这里指摄像头）

//console.log(Media)


let openMedia = (stream) => {
    console.log(stream);

    mediaStream = stream; //暴露当前视频流

    try {
        video.srcObject = stream;
    } catch (err) {
        console.warn(err);
        video.src = URL.createObjectURL(stream);
    }

    video.play();

    video.onloadedmetadata = function () {
        console.log('摄像头成功打开！');
    };
};
let errInfo = (info) => {
    alert(info)
};

open.addEventListener('click', () => {
    navigator.getUserMedia({video: true, audio: false}, openMedia, errInfo);
});

close.addEventListener('click', () => {
    try {
        mediaStream.stop();
    } catch (err) {
        console.warn(err);
        let trackList = [mediaStream.getAudioTracks(), mediaStream.getVideoTracks()];
        trackList.forEach((tracks) => {
            if (tracks && tracks.length > 0) {
                for (let i = 0; i < tracks.length; i++) {
                    typeof tracks[i].stop === 'function' && tracks[i].stop();
                }
            }
        })
    }
});

snap.addEventListener('click', () => {
    ctx.drawImage(video, 0, 0, video.width, video.height);
});


