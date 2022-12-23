import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { extendTheme , ChakraProvider } from '@chakra-ui/react';
import {createBrowserRouter, HashRouter, Outlet, RouterProvider } from 'react-router-dom'
// import Header from './component/header';
import Layout from './page/layout';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import ArticleList from './page/BlogList';
import NotFound from './page/ErrorPage';
import BlogDetail from './page/BlogDetail';
import {  MultiSelectTheme } from 'chakra-multiselect'
// import MyAccout from './page/MyAccout';
import UserProfileEdit from './page/MyAccout';
import MyArticle from './page/MyArticle';
import AboutPage from './page/About';
import CoinFPage from './page/CoinFPage';


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
      {
        path: "/my-account",
        element: <UserProfileEdit />,
      },
      {
        path: "/my-article",
        element: <MyArticle />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/favourite-coin",
        element: <CoinFPage />,
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


const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})
root.render(
  <>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} /> 
    </ChakraProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
