import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

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

function onFormSubmit(event) {
  event.preventDefault();

  const delay = Number(refs.delayInput.value);
  const step = Number(refs.stepInput.value);
  const amount = Number(refs.amountInput.value);
  const promises = [];

  for (let i = 1; i <= amount; i += 1) {
    const promiseDelay = delay + step * (i - 1);
    const promise = createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(promise);
  }

  Promise.all(promises).then(() => {
    Notify.info(`✅ All promises completed`);
  });
}