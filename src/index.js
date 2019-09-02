import { db } from './firebaseConfig';

import './index.css';
import update from './helpers/update';

const buttons = document.querySelectorAll('button');
const form = document.querySelector('form');
const formAct = document.querySelector('form span');
const input = document.querySelector('input');
const error = document.querySelector('.error');

let activity = 'cycling';

buttons.forEach(btn => {
  btn.addEventListener('click', event => {
    update(data, activity);

    activity = event.target.dataset.activity;

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    input.setAttribute('id', activity);

    formAct.textContent = activity;
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const distance = parseInt(input.value);
  if (distance) {
    db.collection('activities').add({
      distance,
      activity,
      date: new Date().toString(),
    }).then(() => {
      error.textContent = '';
      input.value = '';
    });
  } else {
    error.textContent = 'Please enter a valid distance';
  }
});

let data = [];

db.collection('activities').onSnapshot(resp => {
  resp.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'modified':
        const index = data.findIndex(item => item.id === doc.id);
        data[index] = doc;
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }
  });

  update(data, activity);
});
