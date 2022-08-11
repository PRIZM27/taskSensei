import {useState, useEffect} from 'react';

import classes from '../assets/sass/components/_TaskSquare.module.scss';


import icons from '../img/icons/sprite/sprite.svg';

import iconComplete from '../img/icons/svg/circle-check.svg';

import iconInProgress from '../img/icons/svg/cog.svg'

import iconIncomplete from '../img/icons/svg/circle-x.svg'



const TaskSquare = (props) => { 

  let iconStatus = iconComplete;

  const setStatus = (taskStatus) => { 
  //  taskStatus === 'complete' ? iconStatus = iconComplete : '';
  //  taskStatus === 'in-progress' ? iconStatus = iconInProgress: '';
  //  taskStatus === 'incomplete' ? iconStatus = iconIncomplete: '';

  }


  return ( 
    <div  className={classes.task__square + ` task__square`} onClick={props.onClick}>
      <h3 className={classes.task__heading}>{props.name}</h3>
      <h4 className={classes.task__date}>{props.date}</h4>
      <div className={classes.task__details}></div>
      <svg className={classes.status__icon} ><use href={`${icons}/#circle-check`}></use></svg>
    </div>)
  
  // <div className={classes.task__square}>
  //   <h3 className={classes.task__heading}>{props.name}</h3>
  //   <h4 className={classes.task__date}>{props.date}</h4>
  //   <div className={classes.task__details}></div>
  // </div>)
}

export default TaskSquare;