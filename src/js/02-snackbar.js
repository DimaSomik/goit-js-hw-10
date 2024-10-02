import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const promiseState = formData.get('state');
    const promiseDelay = parseInt(formData.get('delay'));

    createPromise(promiseDelay, promiseState)
        .then(delay => {iziToast.success({message: `✅ Fulfilled promise in ${delay}ms`});})
        .catch(delay => {iziToast.error({message: `❌ Rejected promise in ${delay}ms`});});

    event.target.reset(); 
});

function createPromise(delay, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};