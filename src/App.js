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
        <Route path='/tasks' element={<Layout />}/>
        <Route path='/profile/*' element={<Profile />}>
          <Route path ="outlet-page" element={<h1 style={{color:'black',}}>Outlet Page</h1>} />
        </Route>
        <Route path='/faq' element={<Faq />}/>
        {/* <Route path ='*' element={<h1>NOT FOUND</h1>}/> */}
        <Route path='/login' element={<Login />}/>
      </Routes>   
    </Provider>
  );
}

export default App;
