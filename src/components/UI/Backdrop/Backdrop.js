import {Fragment} from 'react';
import classes from './Backdrop.module.scss';

const Backdrop = (props) => { 
  return (
  <Fragment>
    <div className={classes.backdrop} onClick={props.onConfirm}></div>
  </Fragment>)
}

export default Backdrop;