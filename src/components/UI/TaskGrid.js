import {useState, useEffect, useCallback, CSSProperties} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taskActions } from '../../store/task-slice';

import classes from '../../assets/sass/layout/_TaskGrid.module.scss';

import StatusContainer from '../StatusContainer';
import TaskSquare from '../TaskSquare';

// loading spinners
import MoonLoader from 'react-spinners/MoonLoader';
// import {Oval} from 'react-loader-spinner';

import useHttp from '../../hooks/use-http';

const TaskGrid = (props) => { 

  // const[currentTask, setCurrentTask] = useState('');
  const tasks = useSelector(state => state.taskSlice.tasks);
  const dispatch = useDispatch();

// add styling to indicate current task being worked with
const makeCurrentTask = (e) => { 

// store the clicked task DOM element in a variable
const clickedTaskEl = e.target.closest('.task__square');
console.log(clickedTaskEl);

// Drill down into clicked task element and  store task name in a variable
const clickedTaskElName = clickedTaskEl.querySelector('h3').textContent.trim().toLowerCase();

// add the current-square to clicked square
clickedTaskEl.classList.add('current-square');

// pack the taskSquare DOM elements into new array
const [...taskSquares] = [...document.querySelectorAll('.task__square')];

// loop through taskSquare DOM array
taskSquares.forEach(task => {
  /* remove the current-square class if task names doesn't match the clicked square */
  if(task.firstElementChild.textContent.trim().toLowerCase() !== clickedTaskElName){
    task.classList.remove('current-square');
  }
})

// get the object form of the task that matches clicked square
const currentTaskObj = tasks.find(task => task.name.trim().toLowerCase() === clickedTaskElName);

// pass the the current task obj to designate it as the current task
// task in task pane will reflect the task square that's clicked
dispatch(taskActions.makeCurrentTask(currentTaskObj));

// terminate editing mode
dispatch(taskActions.setEditing(false));


}

let TaskSquareContent

if(props.tasks) { 
  TaskSquareContent = props.tasks.map(task => {  
    return <TaskSquare
    key={task.id} 
    name={task.name}
    date={task.date}
    onClick={makeCurrentTask}
    />
  })
}  

let content;

if(props.error){
  content = <p className={classes.error}>Something went wrong</p>
  return (
    <div className={classes['task__squares-container']}>
     {content}
    </div>)
}

// TaskSquare Content based on task status (incomplete, complete, in-progress)
const IncompleteTask = tasks.filter(task => task.status === 'incomplete').map(task => { 
  return  <TaskSquare
  key={task.id} 
  name={task.name}
  date={task.date}
  onClick={makeCurrentTask}
  />
});

const InProgressTask = tasks.filter(task => task.status === 'in-progress').map(task => { 
  return  <TaskSquare
  key={task.id} 
  name={task.name}
  date={task.date}
  onClick={makeCurrentTask}
  />
});

const CompletedTask = tasks.filter(task => task.status === 'complete').map(task => { 
  return  <TaskSquare
  key={task.id} 
  name={task.name}
  date={task.date}
  onClick={makeCurrentTask}
  />
});

// Loading spinner displayed when fetching tasks
const CSSProperties =  { 
  gridColumn: 2,
  gridRow: 2,
  justifySelf: 'center',
  alignSelf: 'center',
};

const override = {...CSSProperties};

  if(props.loading) { 
    return (
      <section className={classes.task__grid}>
        <MoonLoader 
        color={'yellow'} 
        loading={props.loading}
        cssOverride={override}
         />
         {/* <Oval  color={'yellow'} height={'500'} width={'500'} gridColumn={2} gridRow={2} /> */}
      </section>
    )
  }

  return (
  <section className={classes.task__grid}>
      <div className={classes['task__squares-container']}>
        <StatusContainer className='container__incomplete'>
          <h3 className={classes['status__heading']}>Incomplete</h3>
          {IncompleteTask}
        </StatusContainer>
        <StatusContainer className='container__in-progress'>
        <h3 className={classes['status__heading']}>In-Progress</h3>
        {InProgressTask}
        </StatusContainer>
        <StatusContainer className='container__complete'>
          <h3 className={classes['status__heading']}>Complete</h3>
          {CompletedTask}
        </StatusContainer>
      </div>
  </section>
  )
}

export default TaskGrid;