import classes from '../../assets/sass/components/_TaskForm.module.scss';

import {useState, useEffect, useReducer, Fragment, useRef} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {taskActions} from '../../store/task-slice';

import Message from '../Messages/Message';

// helpers and config imports
import { duplicateTask } from '../../helpers';

const taskInputReducer = (state, action) => { 
  if(action.type === 'USER__INPUT'){
    return { 
      value: action.val,
      isValid: action.val !== '',
    }
  }

  if(action.type === 'BLUR'){
    return { 
      isValid: state.isValid,
    }
  }

  if(action.type === 'SUBMIT'){
    
    return {
      value: '',
      isValid: null,
    }
  }

  if(action.type === 'CHECK'){
    return { 
      value: state.value,
    }
  }

  // default return object
  return {val:'', isValid: null,}
}

let messageContent = '';


const TaskForm = (props) => { 

  // managed states
const taskInputRef = useRef();

const [taskState, dispatchTask] = useReducer(taskInputReducer, {
  value: '',
  isValid: null,
})

const tasks = useSelector(state => state.taskSlice.tasks);
const taskVal = useSelector(state => state.taskSlice.taskInputVal);

// const [taskInputVal, setTaskInputVal] = useState('');
// const[inputIsValid, setInputisValid] = useState(null);
// const [filteredTasks, setFilteredTasks] = useState([]);

// used hooks
const dispatch = useDispatch();

// functions
const taskInputChangeHandler = async (e) => { 
  // messageContent = '';
  dispatchTask({type: 'USER__INPUT', val: e.target.value})
  // setTaskInputVal(taskState.value);
  // setInputisValid(taskState.isValid);

    
 const duplicate = tasks.some(task => task.name === taskInputRef.current.value);

if(duplicate){
  messageContent = 'Task with that name already exists. Please choose different name for your task';
}


}

const taskInputBlurHandler = (e) => { 
  dispatchTask({type:'BLUR'})

  messageContent = !taskState.isValid ? 'Please enter at least one character' : messageContent;
}

// const filteredTask = tasks.filter(task => task.name.trim().toLowerCase() === taskInput?.trim().toLowerCase());

  const taskSubmitHandler = (e) => { 
    // messageContent = '';
    // prevent form sending http request
    e.preventDefault();

    // pass the user input value to parent component function
    if(taskState.isValid === true){
      dispatch(taskActions.enteredTask(taskState.value));
      dispatch(taskActions.buildTask(taskState.value));
    }
    
    // setInputisValid(null);
    // setTaskInputVal('');
    // taskInputRef.current.value = '';
    
  }

// useEffect(() => { 
//   console.log(taskState.value);
// },[taskState.value]);
   
// useEffect(()=> {
//   // logic for filtering tasks array for any tasks matching user input
//   const identifier = setTimeout(() => { 
//     console.log('Filtering tasks array for matching tasks')

//     // const filterTasksHandler = () => { 
//     //   tasks.filter(task => task.name.trim().toLowerCase().includes(taskInputVal.trim().toLowerCase()));
//     // }

//     // create an array of tasks that matches user input
//     if(tasks){
//       console.log(tasks.filter(task => task.name.trim().toLowerCase().includes(taskInputVal.trim().toLowerCase())));
//     }

//     // clean up function for better performance
//     return () => { 
//       console.log('CLEANUP');
//       clearTimeout(identifier);
//     }
  
//   },500)
// },[tasks, taskInputVal]);  



  return (
    <Fragment>
    <form action="#" 
      className={classes.task__form}
      onSubmit={taskSubmitHandler}
      >
        <div className={`${classes.control} ${taskState.isValid === false ? 'invalid' : ''}`}>
          <label htmlFor={"task"}>Task Name</label>
          <input
            ref={taskInputRef}
            onChange={taskInputChangeHandler}
            onBlur={taskInputBlurHandler}
            value={taskState.value}
            type="text"
            id={'task'}
            placeholder="Create or search for a task!"
          />
          {/* {taskState.isValid === false && <p className={classes['task__input--message'] }>Enter valid task name (at least 1 character)</p>} */}
          {messageContent && <Message status={messageContent ? 'error' : ''}>{messageContent}</Message>}
        </div>
      </form>

  
    </Fragment>
     
  )
}

export default TaskForm;
