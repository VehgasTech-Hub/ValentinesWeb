const loading = document.getElementById('loading');
const countdownEl = document.getElementById('countdown');
const videoContainer = document.getElementById('videoContainer');
const introVideo = document.getElementById('introVideo');
const main = document.getElementById('main');
const music = document.getElementById('music');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function fakeLoading() {
  setTimeout(() => startCountdown(), 2000); // 2s fake loading
}

function startCountdown() {
  loading.classList.add('hidden');
  countdownEl.classList.remove('hidden');
  let numbers = ["3", "2", "1", "Watch your Valentine surprise 💖"];
  let idx = 0;
  const interval = setInterval(() => {
    countdownEl.innerText = numbers[idx];
    idx++;
    if (idx >= numbers.length) {
      clearInterval(interval);
      countdownEl.classList.add('hidden');
      playVideo();
    }
  }, 1000);
}

function playVideo() {
  videoContainer.classList.remove('hidden');
  introVideo.play();
  music.play();
  introVideo.onended = () => {
    videoContainer.classList.add('hidden');
    showMain();
  }
}

// HEART ANIMATION
let hearts = [];
for (let i = 0; i < 50; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1,
    emoji: Math.random() < 0.5 ? "💖" : "💋"
  });
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    ctx.font = `${h.size}px Arial`;
    ctx.fillText(h.emoji, h.x, h.y);
    h.y -= h.speed;
    if (h.y < -50) { h.y = canvas.height + 50; h.x = Math.random() * canvas.width; }
  });
  requestAnimationFrame(drawHearts);
}

// MAIN SCREEN
function showMain() {
  main.classList.remove('hidden');
  drawHearts();
}

// FIREWORKS
function fireWorkEffect() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;
      ctx.fillStyle = ['red', 'pink', 'white'][Math.floor(Math.random() * 3)];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }, i * 50);
  }
}

// BUTTONS
yesBtn.onclick = () => {
  fireWorkEffect();
  setTimeout(() => { alert("SHE SAID YES 😍💍💖"); window.close(); }, 5000);
}

noBtn.onclick = () => {
  setTimeout(() => { alert("Thank you for being honest 💐"); window.close(); }, 5000);
}

fakeLoading();