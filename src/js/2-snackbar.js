import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = parseInt(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Fulfilled',
        message: `promise in ${delay}ms`,
        messageColor: '#FFF',
        titleColor: '#FFF',
        backgroundColor: '#59A10D',
        closeOnClick: true,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Rejected',
        message: `promise in ${delay}ms`,
        messageColor: '#FFF',
        titleColor: '#FFF',
        backgroundColor: '#EF4040',
        closeOnClick: true,
        position: 'topRight',
      });
    });
  event.target.reset();
}
