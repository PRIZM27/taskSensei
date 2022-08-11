
import {Fragment} from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../../Backdrop/Backdrop'
import classes from './IntroModal.module.scss';




const ModalOverlay = (props) => { 
  return (
  <Fragment>
    <div className={classes.intro__modal}>
      <h2>Welcome to Task React!</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tortor vitae purus faucibus ornare suspendisse. Sapien eget mi proin sed libero enim sed faucibus. Morbi tincidunt ornare massa eget egestas purus. </p>
      <button onClick={props.onConfirm}>Okay</button>
    </div>
  </Fragment>
)
  // return (
  //   <Fragment>
  //     {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfrim} />,
  //     document.getElementById('backdrop-root'))}
  //   </Fragment>
  // )
}

const IntroModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, 
      document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(<ModalOverlay onConfirm={props.onConfirm}/>,
      document.getElementById('overlay-root'))}
    </Fragment>
  )
}

export default IntroModal;