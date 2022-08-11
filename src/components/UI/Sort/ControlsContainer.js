import Sort from './Sort';
import classes from './_ControlsContainer.module.scss'

const ControlsContainer = (props) => { 
  return (
  <div className={classes.controls__container}>
    <Sort />
  </div>)
}

export default ControlsContainer;