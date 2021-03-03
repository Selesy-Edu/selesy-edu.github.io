import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/home'
import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom"

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './reducers'

import {IfFirebaseAuthed} from "@react-firebase/auth";

import config from './config/configDB'
import { FirebaseAppProvider,useUser } from 'reactfire'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={config}>
      <Provider store={createStore(reducers)}>
        <BrowserRouter>
          <Switch>
            <Route path ="/" component={App} exact />
          </Switch>
        </BrowserRouter>
      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,

  document.getElementById('root')
);


// <IfFirebaseAuthed>{console.log("in")}
//   <Route path ="/home" component={Home} exact />
//   <Redirect to="/home" />
// </ IfFirebaseAuthed>
