
import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyDCm2mZQSdlh87QwJaowJCqC6SdXvyxRRA',
  authDomain: 'rocket-c.firebaseapp.com',
  databaseURL: 'https://rocket-c.firebaseio.com/',
  storageBucket: 'rocket-c.appspot.com',
  messagingSenderId: '544351509649'
})

export const db = firebaseApp.database()
