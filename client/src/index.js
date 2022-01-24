import React from "react";
import ReactDOM from "react-dom";
import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'; 
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux';
import "./index.css";
import App from "./App";

const store = createStore(rootReducer, compose(
    applyMiddleware(
      thunk
    ), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}> 
            <App />
        </Provider>
    </React.StrictMode>,
    
    document.getElementById("root")
);
