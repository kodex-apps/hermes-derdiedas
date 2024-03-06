import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './pages/root';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Lobby from './pages/lobby';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root><Lobby/></Root>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
