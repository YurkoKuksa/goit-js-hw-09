function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

refs.startButton.addEventListener('click', toTargetRun);
refs.stopButton.addEventListener('click', toTargetStop);

let timerId = null;

// ====================
let element = 0;
// ====================

function toTargetRun() {
  // Забороняємо натискання кнопки "Start"
  refs.startButton.disabled = true;

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    console.log(`random color ${++element}:  ${getRandomHexColor()}`);
  }, 1000);
}
function toTargetStop() {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
  // Дозволяємо натискання кнопки "Start" після зупинки
  refs.startButton.disabled = false;
}

//
///

///

// const preciseTeamMeetingDate = new Date('March 16, 2030 14:25:00');
// console.log(preciseTeamMeetingDate.setMinutes(50));

// const date = new Date();
// console.log(
//   'Today is: ',
//   date.getDate(),
//   '-',
//   date.getMonth(),
//   '-',
//   date.getFullYear(),
//   ' ----  ',
//   date.setMinutes(5)
// );

// const date = new Date('March 16, 2030 14:25:00');

// console.log(date.setMinutes(50), date.setFullYear(2040, 4, 8));

// const date = new Date('March 16, 2030 14:25:00');

// console.log(
//   date.toString() +
//     '\n' +
//     date.toTimeString() +
//     '\n' +
//     date.toLocaleTimeString() +
//     '\n' +
//     date.toUTCString() +
//     '\n' +
//     date.toDateString() +
//     '\n' +
//     date.toISOString() +
//     '\n' +
//     date.toLocaleString() +
//     '\n' +
//     date.getTime()
// );

// // Change value of isSuccess variable to call resolve or reject
// const isSuccess = true;

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (isSuccess) {
//       resolve('Success! Value passed to resolve function');
//     } else {
//       reject('Error! Error passed to reject function');
//     }
//   }, 2000);
//   console.log(resolve, reject);
// });
///////////////////////////////////////////////////////
// Функція, яка повертає Promise і виконується асинхронно
// function fetchData() {
//   return new Promise((resolve, reject) => {
//     // Симулюємо асинхронний запит даних
//     setTimeout(() => {
//       const data = 'Дані успішно завантажено';

//       // Перевірка, чи дані були успішно завантажені чи ні
//       if (data) {
//         resolve(data); // Викликаємо resolve у випадку успішного завершення
//       } else {
//         reject('Не вдалося завантажити дані'); // Викликаємо reject у випадку помилки
//       }
//     }, 2000); // Симуляція 2-секундного запиту
//   });
// }

// // Викликаємо функцію з Promise
// fetchData()
//   .then(result => {
//     console.log('Успіх:', result);
//   })
//   .catch(error => {
//     console.error('Помилка:', error);
//   });
/////////////////////////////////////////////////////////////////////////

// function fetchData(shouldSucceed) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldSucceed) {
//         resolve('Дані успішно завантажено');
//       } else {
//         reject('Не вдалося завантажити дані');
//       }
//     }, 100);
//   });
// }

// // Викликати функцію з передачею true, якщо ви хочете, щоб Promise був вирішений успішно
// fetchData(true)
//   .then(result => {
//     console.log('Успіх:', result);
//   })
//   .catch(error => {
//     console.error('Помилка:', error);
//   });

//////////////////////////////////////////////////////////
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Гра вгадай слово</title>
//   <script src="game.js" defer></script>
// </head>
// <body>

// <h1>Гра вгадай слово</h1>
// <p id="result"></p>
// <input type="text" id="guessInput" placeholder="Введіть слово">
// <button onclick="checkGuess()">Підтвердити</button>

// </body>
// </html>
// *****************************
// game.js

// function fetchData(shouldSucceed) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldSucceed) {
//         resolve('Ви вгадали слово!');
//       } else {
//         reject('Невірно, ви програли.');
//       }
//     }, 2000);
//   });
// }

// function checkGuess() {
//   const guessInput = document.getElementById('guessInput').value.toLowerCase();

//   // Викликаємо асинхронну задачу, яка повертає Promise
//   fetchData(guessInput === 'Каденюк')
//     .then(result => {
//       document.getElementById('result').innerText = result;
//     })
//     .catch(error => {
//       document.getElementById('result').innerText = error;
//     });
// }
//////////////////////////////////////////////
