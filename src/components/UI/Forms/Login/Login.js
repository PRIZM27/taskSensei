import GeneralLayout from '../../../Layout/LayoutGeneral';
import classes from './Login.module.scss';

const Login = () => { 
  return ( 
    <GeneralLayout>
      <div className={classes.form__container}>
      <form className={classes.form__primary}>
        <div className={classes.form__controls}>
        <label className={classes.form__label} htmlFor='email'>Email</label> 
      
          <input className={classes.form__input}
                  type='email'          
                  placeholder='Email' 
                  id='email'
            />
        </div>
        <div className={classes.form__controls}>
          <label className={classes.form__label} htmlFor='password'>Password</label>
          
        <input className={classes.form__input}
                type='password'          
                placeholder='Password' 
                id='password'
          />
        </div>
        <button type='submit'>LOGIN</button>
      </form>
      </div>
    </GeneralLayout>
    
  )
}

export default Login;