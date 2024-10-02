import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const calendar = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const secondsSpan = document.querySelector('span[data-seconds]');
const minutesSpan = document.querySelector('span[data-minutes]');
const hoursSpan = document.querySelector('span[data-hours]');
const daysSpan = document.querySelector('span[data-days]');

let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    const currentDate = new Date();
    userSelectedDate = selectedDate[0];

    if (userSelectedDate <= currentDate) {
      iziToast.error({message: 'Please choose a date in the future'});
      startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
  },
};

flatpickr(calendar, options);

function convertMs(ms) {
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function countDown() {
  startBtn.disabled = true;

  const refreshTimer = () => {
    const currentTime = new Date();
    const timeDiff = userSelectedDate - currentTime;

    if (timeDiff <= 0) {
      clearInterval(timerInterval);
      return;
    };

    const timeLeft = convertMs(timeDiff);
    daysSpan.textContent = addLeadingZero(timeLeft.days);
    hoursSpan.textContent = addLeadingZero(timeLeft.hours);
    minutesSpan.textContent = addLeadingZero(timeLeft.minutes);
    secondsSpan.textContent = addLeadingZero(timeLeft.seconds);
  };

  refreshTimer();
  timerInterval = setInterval(refreshTimer, 1000);
}

startBtn.addEventListener('click', countDown);