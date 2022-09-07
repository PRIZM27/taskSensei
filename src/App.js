import {useState, useCallback, useEffect} from 'react';
import store from './store/index';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';

// styles import
import './assets/sass/App.scss';

import MainNavigation from './components/UI/MainNavigation/MainNavigation';
import Layout from './pages/Layout';
import Profile from './pages/Profile';
import Faq from './pages/Faq';
import Login from './components/UI/Forms/Login/Login';

function App() {
  
  return (
    <Provider store={store} > 
      <MainNavigation />
      <Routes>
        <Route path='/' element={<Layout />}/>
      </Routes>   
    </Provider>
  );
}

export default App;
