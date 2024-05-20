import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    const now = new Date();

    if (userSelectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: '#EF4040',
        closeOnClick: true,
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startButton.disabled = true;

startButton.addEventListener('click', selectDate);
function selectDate() {
  if (userSelectedDate && userSelectedDate > new Date()) {
    startButton.disabled = true;
    dateTimePicker.disabled = true;
    startCountdown(userSelectedDate);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startCountdown(targetDate) {
  countdownInterval = setInterval(function () {
    const now = new Date();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      dateTimePicker.disabled = false;
      return;
    }

    const time = convertMs(timeLeft);

    daysElem.textContent = addLeadingZero(time.days);
    hoursElem.textContent = addLeadingZero(time.hours);
    minutesElem.textContent = addLeadingZero(time.minutes);
    secondsElem.textContent = addLeadingZero(time.seconds);
  }, 1000);
}
