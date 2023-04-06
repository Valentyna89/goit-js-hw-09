const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);

let timerId;

function getRandomHexColor() {
  const color = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
  document.body.style.backgroundColor = color;
}

function onStart() {
  getRandomHexColor();
  timerId = setInterval(getRandomHexColor, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onStop() {
  clearInterval(timerId);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
}
