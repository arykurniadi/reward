import React from 'react';
import "bootstrap/scss/bootstrap.scss";
import "@fontsource/nunito";
import { getPersistor } from "@rematch/persist";
import { createRoot } from 'react-dom/client';
import { PersistGate } from "redux-persist/es/integration/react";
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { Provider } from 'react-redux';
import { getLocalStorage } from "./utils/generalUtil";
import stores from "./stores";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home";
import LoginPage from "./pages/login";

import ProtectedRoute from './ProtectedRoute';

const root = createRoot(document.getElementById('root'));
const persistor = getPersistor();

root.render(
  <React.StrictMode>
    <Provider store={stores}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<LoginPage />} />
              <Route path='/login' element={<LoginPage />} />

              <Route path='/home' element={ <ProtectedRoute><HomePage /></ProtectedRoute>} />
              {/* <Route path='/home' element={<HomePage />} /> */}              
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
