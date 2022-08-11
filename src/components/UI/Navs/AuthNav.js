import classes from '../MainNavigation/MainNavigation.module.scss'
import { NavLink } from 'react-router-dom';


const standardLink = `${classes['nav--top__link']}`;
const activeLink = `${classes['nav--top__link']} + ${classes.active}`

const AuthorizedNav = () => { 



  return (
    <nav className={classes['nav--top']}>
    <div className={classes.logo}>TaskReact</div>
    <ul className={classes['nav--top__list']}>
    <li><NavLink to="/tasks" className={(navData) => navData.isActive ? activeLink : standardLink}>Tasks</NavLink>
      </li>
      <li><NavLink to="/profile" className={(navData) => navData.isActive ? activeLink : standardLink}>Profile</NavLink>
      </li>
      <li>
        <NavLink to='/faq' className={(navData) => navData.isActive ? activeLink : standardLink}>FAQ</NavLink>
      </li>
    </ul>
  </nav>
  )
}

export default AuthorizedNav;