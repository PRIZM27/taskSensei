import { useState, Fragment } from 'react';
import VisitorNav from '../Navs/VisitorNav';
import AuthorizedNav from '../Navs/AuthNav';


const MainNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <Fragment>
   {isLoggedIn && <AuthorizedNav />}
  {!isLoggedIn && <VisitorNav />}
    </Fragment>
  )


}



export default MainNavigation;