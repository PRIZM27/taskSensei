import {Outlet, Link} from 'react-router-dom';
import classes from './Profile.module.scss';


const Profile = () => { 
  return (
    <div className={classes['profile__container']}>
      <h1>The User Profile Page</h1>
      <Link to='outlet-page'>OutLet Page</Link>
      <Outlet />
    </div>
    )
  }
  
  export default Profile;

// your-domain.com/profile