import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import {applyMiddleware, createStore} from "redux"
import thunk from 'redux-thunk'
import {Provider} from "react-redux"
import rootReducer from "./reducers/rootreducer"
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import firebase from './config/fbConfig'
import { createFirestoreInstance } from 'redux-firestore'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'firebase/auth'
import { composeWithDevTools } from 'redux-devtools-extension';
const rrfConfig = { userProfile: 'users' }
const store = createStore(rootReducer,composeWithDevTools( applyMiddleware(thunk.withExtraArgument({getFirebase}))))

const rrfProps = {
    firebase,
    config:{},
    dispatch: store.dispatch,
    createFirestoreInstance
}

ReactDom.render(
    <Provider store= {store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
                <App/>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
)
