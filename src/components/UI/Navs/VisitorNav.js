import classes from '../MainNavigation/MainNavigation.module.scss'
import {NavLink} from 'react-router-dom';

const standardLink = `${classes['nav--top__link']}`;
const activeLink = `${classes['nav--top__link']} + ${classes.active}`

const VisitorNav = () => { 
  return (
    <nav className={classes['nav--top']}>
    <div className={classes.logo}>Task Sensei</div>
    {/* <ul className={classes['nav--top__list']}>
    <li><NavLink to="/register" className={(navData) => navData.isActive ? activeLink : standardLink}>Create Account</NavLink>
      </li>
      <li><NavLink to="/login" className={(navData) => navData.isActive ? activeLink : standardLink}>Login</NavLink>
      </li>
      <li>
        <NavLink to='/faq' className={(navData) => navData.isActive ? activeLink : standardLink}>FAQ</NavLink>
      </li>
    </ul> */}
  </nav>
  )
}

export default VisitorNav;