let passwordQueue = [];
let currentPassword = '';
const rooms = [1, 2, 3, 4];
let calledPasswords = [];
let currentVideoIndex = 0;
const videos = ['video1', 'video2', 'video3'];

function addPassword() {
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword) {
        passwordQueue.push(newPassword);
        document.getElementById('newPassword').value = '';
        updatePasswordList();
    }
}

function updatePasswordList() {
    const passwordListElement = document.getElementById('passwordList');
    if (passwordQueue.length > 0) {
        passwordListElement.innerHTML = passwordQueue.map(pw => `<div>${pw} - Aguardando</div>`).join('');
    } else {
        passwordListElement.innerHTML = 'Nenhuma senha na fila';
    }
}

function callNextPassword() {
    if (passwordQueue.length > 0) {
        currentPassword = passwordQueue.shift();
        const assignedRoom = rooms[Math.floor(Math.random() * rooms.length)];
        document.getElementById('currentPassword').innerText = currentPassword;
        document.getElementById('currentRoom').innerText = `Sala ${assignedRoom}`;
        
        // Adiciona a senha chamada à lista de senhas chamadas
        calledPasswords.push({ password: currentPassword, room: assignedRoom });

        // Se a lista de senhas chamadas ultrapassar 5, remove a mais antiga
        if (calledPasswords.length > 5) {
            calledPasswords.shift();
        }

        updatePasswordList();
        updateCalledPasswordsList();
    } else {
        document.getElementById('currentPassword').innerText = 'Aguardando...';
        document.getElementById('currentRoom').innerText = '---';
    }
}

function updateCalledPasswordsList() {
    const calledPasswordsListElement = document.getElementById('calledPasswordsList');
    if (calledPasswords.length > 0) {
        calledPasswordsListElement.innerHTML = calledPasswords.map(pw => `<div>${pw.password} - Sala ${pw.room}</div>`).join('');
    } else {
        calledPasswordsListElement.innerHTML = 'Nenhuma senha chamada';
    }
}

function playNextVideo() {
    const currentVideo = document.getElementById(videos[currentVideoIndex]);
    currentVideo.classList.remove('active');
    
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    const nextVideo = document.getElementById(videos[currentVideoIndex]);

    nextVideo.classList.add('active');
    nextVideo.play();

    setTimeout(() => {
        currentVideo.pause();
    }, 1000);
}

videos.forEach(videoId => {
    const videoElement = document.getElementById(videoId);
    videoElement.addEventListener('ended', playNextVideo);
    videoElement.play();
    if (videoId === videos[0]) {
        videoElement.classList.add('active');
    }
});

setInterval(callNextPassword, 5000);