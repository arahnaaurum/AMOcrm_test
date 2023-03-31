const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    let timerId = null;
    let now = new Date();
    const deadline = now.setSeconds(now.getSeconds() + seconds);

    function runCountDown () {
      const timeGap = deadline - new Date();
      const hours = timeGap > 0 ? Math.floor(timeGap / 1000 / 60 / 60 ) : 0;
      const minutes = timeGap > 0 ? Math.floor(timeGap / 1000 / 60 ) % 60 : 0;
      const sec = timeGap > 0 ? Math.ceil(timeGap / 1000 % 60) : 0;
      let hoursText = '';
      hours < 10 ? hoursText = '0' + hours : hoursText = hours;
      let minutesText = '';
      minutes < 10 ? minutesText = '0' + minutes : minutesText = minutes;
      let secondsText = '';
      sec < 10 ? secondsText = '0' + sec : secondsText = sec;
      timerEl.innerText = `${hoursText}:${minutesText}:${secondsText}`;

      if (timeGap <= 0) {
        clearInterval(timerId);
      }
    }
    runCountDown();
    timerId = setInterval(runCountDown, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  let isTypeNumber = /^\d+$/.test(inputEl.value);
  if(!isTypeNumber) {
    inputEl.value = '';
  }
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
