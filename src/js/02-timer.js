import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  timerID: document.querySelectorAll('.value'),
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
};

refs.startBtn.disabled = true;

let intervalId = null;
let selectedDate;
let now;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    //
    setTimerFromInput();
    //
    console.log(selectedDates[0]);
    now = new Date().getTime();
    if (selectedDate < now) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};
flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', toBtnClick);

//////////////////////////////////
// Функція для встановлення часу на таймері з вибраної дати
function setTimerFromInput() {
  const currentTime = new Date().getTime();
  const selectedDateTime = selectedDate.getTime();

  if (selectedDateTime < currentTime) {
    Notiflix.Notify.failure('Please choose a future date');
    return;
  }

  const timer = convertMs(selectedDateTime - currentTime);
  refs.timerID[0].textContent = addLeadingZero(timer.days);
  refs.timerID[1].textContent = addLeadingZero(timer.hours);
  refs.timerID[2].textContent = addLeadingZero(timer.minutes);
  refs.timerID[3].textContent = addLeadingZero(timer.seconds);
}

// .////////////\///////////
// Обробник кліку на кнопці "Start"
function toBtnClick() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    const currentTime = new Date().getTime();

    if (selectedDate - currentTime <= 0) {
      clearInterval(intervalId);
      Notiflix.Notify.success('Please choose a date in the future');
    }

    const timer = convertMs(selectedDate - currentTime);
    refs.timerID[0].textContent = addLeadingZero(timer.days);
    refs.timerID[1].textContent = addLeadingZero(timer.hours);
    refs.timerID[2].textContent = addLeadingZero(timer.minutes);
    refs.timerID[3].textContent = addLeadingZero(timer.seconds);

    // Object.entries(timer).forEach(([, value], index) => {
    //   refs.timerID[index].textContent = addLeadingZero(value);
    // });
  }, 1000);
}

// Функція для додавання ведучого нуля до числа
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для конвертації мілісекунд в об'єкт {days, hours, minutes, seconds}
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
