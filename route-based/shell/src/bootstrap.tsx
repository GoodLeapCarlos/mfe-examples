import App from './App';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import ReactDOM from 'lib-app/react-dom';
// import React from 'lib-app/react';
ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );