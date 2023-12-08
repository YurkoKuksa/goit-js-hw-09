import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', toTargetSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function toTargetSubmit(evt) {
  evt.preventDefault();

  let delayInput = Number(evt.target.elements.delay.value);
  let stepInput = Number(evt.target.elements.step.value);
  let amountInput = Number(evt.target.elements.amount.value);

  for (let i = 1; i <= amountInput; i++) {
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayInput += stepInput;
  }
}
