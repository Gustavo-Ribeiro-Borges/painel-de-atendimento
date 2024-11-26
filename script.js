let passwordQueue = [];
let currentPassword = '';
const rooms = [1, 2, 3, 4];
let calledPasswords = [];
let currentVideoIndex = 0;
const videos = ['video1', 'video2', 'video3'];
let passwordCounter = 1; // Contador para a numeração das senhas

function addPassword() {
    // Cria a senha com número sequencial
    const newPassword = String(passwordCounter).padStart(2, '0'); // Garante que a senha tenha 2 dígitos (01, 02, 03, etc.)
    
    // Adiciona a senha à fila
    passwordQueue.push(newPassword);
    
    // Atualiza a lista de senhas
    updatePasswordList();
    
    // Incrementa o contador para a próxima senha
    passwordCounter++;
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
        
        calledPasswords.push({ password: currentPassword, room: assignedRoom });

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