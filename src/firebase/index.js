import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import config from './config'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase.auth()