import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AuthContextProvider from './context/AuthContextProvider'
import Book from './pages/Book';
import Home from './pages/HomePage';
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/books',
    element: <Book />
  }
])

root.render(
  <React.StrictMode>
    <AuthContextProvider>
        <RouterProvider router={router} />
    </AuthContextProvider>
    <ToastContainer />
  </React.StrictMode>
);
