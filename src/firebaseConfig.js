import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB7G27jQyUwn7hqlFdCiijHiYrSyq2XCVg',
  authDomain: 'd3-chart-test.firebaseapp.com',
  databaseURL: 'https://d3-chart-test.firebaseio.com',
  projectId: 'd3-chart-test',
  storageBucket: 'd3-chart-test.appspot.com',
  messagingSenderId: '141626655231',
  appId: '1:141626655231:web:6304dfafbc18e428',
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
