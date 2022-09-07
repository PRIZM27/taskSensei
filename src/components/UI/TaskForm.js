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
const inputValueRdx = useSelector(state => state.taskSlice.taskInputVal);
const taskInputRef = useRef();

const [taskState, dispatchTask] = useReducer(taskInputReducer, {
  value: inputValueRdx,
  isValid: null,
})

const tasks = useSelector(state => state.taskSlice.tasks);
const isEditing = useSelector(state => state.taskSlice.isEditing);


// used hooks
const dispatch = useDispatch();

// functions

const taskInputChangeHandler = async (e) => { 

  const duplicate = tasks.some(task => task.name.trim().toLowerCase() === taskInputRef.current.value.trim().toLowerCase());

  if(duplicate){
    messageContent = 'Task with that name already exists. Please choose different name for your task';
  } else { 
    messageContent = '';
  }

  dispatchTask({type: 'USER__INPUT', val: e.target.value});
  dispatch(taskActions.filterSearchResults(e.target.value));

}


const taskInputBlurHandler = (e) => {   
    if(!isEditing){
      dispatchTask({type:'BLUR'})
      messageContent = !taskState.isValid ? 'Please enter at least one character' : messageContent;
    }
    
}



  const taskSubmitHandler = (e) => { 
    e.preventDefault();

    // pass the user input value to parent component function
    if(taskState.isValid === true){
      dispatch(taskActions.enteredTask(taskState.value));
      dispatch(taskActions.buildTask(taskState.value));
      dispatch(taskActions.makeCurrentTask(null));
    }
    
    

    dispatchTask({type:'USER__INPUT', val: '',});
    messageContent = '';
  }


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
