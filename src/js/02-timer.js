import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

startBtn.disabled = true;

input.addEventListener('input', onInputChange);
startBtn.addEventListener('click', onClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(input, options);

function onInputChange() {
  const selectedDate = fp.selectedDates[0];
  const today = new Date();

  if (selectedDate < today) {
    Notiflix.Notify.failure('Please choose a date in the future');
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  }
}

function onClick() {
  const selectedDate = fp.selectedDates[0];
  const today = new Date();

  if (selectedDate < today) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  const intervalId = setInterval(updateTimer, 1000);

  function updateTimer() {
    startBtn.disabled = true;
    const timeRemaining = selectedDate.getTime() - new Date().getTime();

    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    timer.querySelector('[data-days]').textContent = addLeadingZero(days);
    timer.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    timer.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    timer.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(number) {
  return String(number).padStart(2, 0);
}
