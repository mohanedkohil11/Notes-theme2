import {combineReducers} from 'redux'
import reminders from "./indexreducer"

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
const rootReducer = combineReducers({
    reminder: reminders,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  });

  export default rootReducer;