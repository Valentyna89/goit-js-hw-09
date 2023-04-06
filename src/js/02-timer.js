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
    alert('Please choose a date in the future');
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  }
}

function onClick() {
  const selectedDate = fp.selectedDates[0];
  const today = new Date();

  if (selectedDate < today) {
    alert('Please choose a date in the future');
    return;
  }

  const intervalId = setInterval(updateTimer, 1000);
  function updateTimer() {
    const timeRemaining = selectedDate.getTime() - new Date().getTime();

    if (timeRemaining < 0) {
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, '0');
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((timeRemaining / 1000) % 60)
      .toString()
      .padStart(2, '0');

    timer.querySelector('[data-days]').textContent = days;
    timer.querySelector('[data-hours]').textContent = hours;
    timer.querySelector('[data-minutes]').textContent = minutes;
    timer.querySelector('[data-seconds]').textContent = seconds;
  }
}
