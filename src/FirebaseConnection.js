import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDo7wS_lbO2zRsCntUo4Q3WLV8mE_25ryE",
    authDomain: "fluxocaixa-a9ab2.firebaseapp.com",
    databaseURL: "https://fluxocaixa-a9ab2.firebaseio.com",
    projectId: "fluxocaixa-a9ab2",
    storageBucket: "fluxocaixa-a9ab2.appspot.com",
    messagingSenderId: "87622393284"
  };
firebase.initializeApp(config);

export default firebase;