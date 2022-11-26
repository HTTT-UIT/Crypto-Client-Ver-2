import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Button, ChakraProvider } from '@chakra-ui/react';
import {createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Header from './component/header';
import Layout from './page/layout';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import ArticleList from './page/BlogList';
import NotFound from './page/ErrorPage';
import BlogDetail from './page/BlogDetail';
                      
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/blog",
        element: <ArticleList />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
    ],
    
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
])

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} /> 
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
