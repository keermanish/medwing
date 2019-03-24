import React from 'react';
import ReactDOM from 'react-dom';

import './common.css';
import Home from './pages/Home/Home';
import StoreContext from './utils/context';
import { getStore } from './utils/store';
import * as serviceWorker from './serviceWorker';

// create app component,
// wrap it with store context so that
// app state and dispatch can be accessible in all child cmp
const App = () => {
  const {state, dispatch} = getStore();

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {/* we can replace with router */}
      <Home />
    </StoreContext.Provider>
  );
};

// render app
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
