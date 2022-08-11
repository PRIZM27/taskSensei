// hooks imports
import {useContext, useEffect, useCallback, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';

// custom hooks imports
import useHttp from '../hooks/use-http';

// helper and config imports
import { FIREBASE_URL } from '../config/config';

// routing imports
import {Routes, Route} from 'react-router-dom';

// state imports (redux)
import { taskActions } from '../store/task-slice';

// style imports
import classes from '../assets/sass/layout/_Layout.module.scss';

// component imports
import TaskForm from '../components/UI/TaskForm';
import TaskGrid from '../components/UI/TaskGrid';
import Task from '../components/UI/Task';
import IntroModal from '../components/UI/Modals/IntroModal/IntroModal';


const Layout = (props) => { 

  const {isLoading, error, sendRequest: fetchTasks} = useHttp();

  // task context (context provider)

  // react-redux data and tools
  const tasksRdx = useSelector(state => state.taskSlice.tasks)
  const taskInputVal = useSelector(state => state.taskSlice.taskInputVal);
  const currentTask = useSelector(state => state.taskSlice.currentTask);
  const status = useSelector(state => state.taskSlice.status);
  const dispatch = useDispatch();

// Component functions
  const transformTasks = useCallback((data) => { 
    // console.log(data, 'transformTasks logging data')

    // build empty array which will populate destructured objects
    const fetchedTasks = [];

    // loop through received data and build task object
    for(const taskKey in data){
      fetchedTasks.push(
        {
          id: taskKey, 
          name: data[taskKey].name,
          date: data[taskKey].date,
          status: data[taskKey].status,
        }
      )
    }
    // console.log(fetchedTasks);
    // set tasks state with received data
    // taskCtx.setFetchedTasks(fetchedTasks);

    // set REDUX state tasks to fetchedTasks
    dispatch(taskActions.setTasks(fetchedTasks))
    // console.log(taskCtx.currentTask, 'current task')
  },[taskInputVal])
  

  useEffect(() => { 
    
    // GET request to server to retrieve stored tasks
    fetchTasks({url: `${FIREBASE_URL}/tasks.json`},transformTasks);
    
  },[fetchTasks, transformTasks, status]);



  // return (  
  //       <div className={classes.container}>
  //       {/* {confirm && <IntroModal onConfirm={confirmHandler} />} */}
  //         <TaskForm tasks={taskCtx.tasks} onTask={taskCtx.getTask} />
  //         <Task task={taskCtx.currentTask} onDelete={taskCtx.deleteTaskHandler}  />
  //         <TaskGrid tasks={tasksRdx} forwardCurrentTask={taskCtx.makeCurrentTask} isLoading={isLoading} error={error}  />
  //       </div>
  //     )



  return ( 
     
  <div className={classes.container}>
      <TaskForm tasks={tasksRdx} />
      {currentTask && <Task />}
      <TaskGrid loading={isLoading} tasks={tasksRdx}/>
  </div>

  )

}


export default Layout;