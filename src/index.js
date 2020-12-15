import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import { Provider } from 'react-redux'
//import { createStore} from "redux";
//import paths from "./redux/paths";
// create the reducer that will let us change the path
// function pathReducer(state = { path: "./"}, action) {
//     if (action.path !== state.path)
//         return { path: action.path }
// }

//const store = createStore(paths)
//<Provider store={store}>
//       <App />
//     </Provider>

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
