const CHANGE_COLOR = 1000;
let idInteger = null;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
}

refs.btnStop.disabled = true;
refs.btnStart.addEventListener('click', onBtnStartChangeColor);
refs.btnStop.addEventListener('click', onBtnStopChangeColor);

function onBtnStartChangeColor() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;

  idInteger = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR);
}

function onBtnStopChangeColor() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;

  clearInterval(idInteger);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
