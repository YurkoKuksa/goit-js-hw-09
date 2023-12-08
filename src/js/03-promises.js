import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
  button: document.querySelector('button'),
};

refs.form.addEventListener('submit', toTargetSubmit);
refs.delayInput.addEventListener('input', toTargetInput);
refs.stepInput.addEventListener('input', toTargetInput);
refs.amountInput.addEventListener('input', toTargetInput);

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
  const form = evt.target;
  let delayInput = Number(refs.delayInput.value);
  let stepInput = Number(refs.stepInput.value);
  let amountInput = Number(refs.amountInput.value);

  for (let i = 1; i <= amountInput; i++) {
    const existingNotification = document.querySelector(
      '.notiflix-notification'
    );
    if (existingNotification) {
      existingNotification.style.display = 'none';
    }

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
// //////////////////////////////////////
function toTargetInput() {
  const delayInputValue = refs.delayInput.value;
  const stepInputValue = refs.stepInput.value;
  const amountInputValue = refs.amountInput.value;

  if (
    delayInputValue !== '' &&
    stepInputValue !== '' &&
    amountInputValue !== ''
  ) {
    const delayValuePromise = new Promise(resolve => {
      resolve(Number(delayInputValue));
    });

    const stepValuePromise = new Promise(resolve => {
      resolve(Number(stepInputValue));
    });

    const amountValuePromise = new Promise(resolve => {
      resolve(Number(amountInputValue));
    });

    Promise.all([delayValuePromise, stepValuePromise, amountValuePromise])
      .then(([delayValue, stepValue, amountValue]) => {
        const message = `Delay: ${delayValue}, Step: ${stepValue}, Amount: ${amountValue}`;
        Notiflix.Notify.info(message);
      })
      .catch(error => {
        Notiflix.Notify.failure(`Error: ${error}`);
      });
  }
}
