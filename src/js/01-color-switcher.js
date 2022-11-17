
let timerId = null;
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    backgroundColor: document.querySelector('body'),
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
        refs.backgroundColor.style.background = `${getRandomHexColor()}`;
    }, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
});


refs.stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
});
