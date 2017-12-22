import firebase from 'firebase';


export const appName = 'adc-react-777';

export const fireBaseConfig = {
    apiKey: 'AIzaSyDxBR2vdjH967x88B2PpXuqgMKkj5lBSNE',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: '240955152766',
};

firebase.initializeApp(fireBaseConfig);