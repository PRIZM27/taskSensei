// hooks imports 
import {useState, useEffect, useContext} from 'react';


import { useSelector, useDispatch } from 'react-redux';

// custom hook imports
import useHttp from '../../hooks/use-http';

// component imports
import TaskContext from '../../store/editing-context';
import TaskEdit from '../UI/TaskEdit';
import editClasses from './_TaskEdit.module.scss';


// helper and config imports 
import { taskExists, duplicateTask } from '../../helpers';
import { FIREBASE_URL } from '../../config/config';

// style imports
import classes from '../../assets/sass/components/_Task.module.scss';

// Figure out why you can't import declarations from button component 
//(maybe only one of these types of imports allowed per file)

import '../../assets/sass/components/Buttons/_btn.scss';

// redux imports

// action creates related to task data
import {taskActions} from '../../store/task-slice';


const Task  = (props) => { 

// component managed state
const [isEditing, setIsEditing] = useState(null);
const {isLoading, error, sendRequest} = useHttp();


// redux state
const task = useSelector(state => state.taskSlice.currentTask);
const tasks = useSelector(state => state.taskSlice.tasks)

const dispatch = useDispatch();



const transformTask = (taskData) => { 
  // console.log(taskData, 'data forwarded to applyTasks');
  // console.log('DISPATCH NOT TRIGGERED');
  const generatedId = taskData.name;

  const createdTask = {
    ...task,
    id: generatedId,
    // name: task.name,
    // date: task.date,
    // status: task.status,
  }

  dispatch(taskActions.addNewTask(createdTask));
}


/* 
  Executes after clicking save button 
  Makes POST request to and stores task to firebase
*/
const saveTask =  async () => { 
    
  // check for duplicate task in tasks array before making POST request
  const duplicate = duplicateTask(tasks, task);

  // terminate POST request if duplicate task exists
  if(duplicate) {
    return
  }; 

  // POST task to database after user finishes setting task details
  sendRequest({
    url: `${FIREBASE_URL}/tasks.json`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: task,
  },transformTask);

  dispatch(taskActions.setTaskInputVal(''));
  // dispatch(taskActions.setEditing(true));
};


// executed when delete button clicked in task pane
const removeTask = () => {

  // remove task active in task pane from state array
  dispatch(taskActions.removeTask(task))

  // remove task active in task pane from firebase
  sendRequest({
    url: `${FIREBASE_URL}/tasks/${task.id}.json`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })

}

const cancelTaskHandler = () => { 
  dispatch(taskActions.cancelTask());
}

const statusChangeHandler = (e) => { 
  if(!task){
    return;
  }
  dispatch(taskActions.updateStatus(e.target.value));
}

const changeTaskDateHandler = (e) => {
  console.log(e.target.value);
  dispatch(taskActions.setDate(e.target.value));
}

useEffect(() => { 
  setIsEditing(taskExists(tasks, task));
},[task, tasks]);

const saveBtn = <button href="#" className={classes["save-btn"]} onClick={saveTask}>SAVE</button>;
const editBtn = <button href="#" className={classes["edit-btn"]}>EDIT</button>;

// logic for which task to render after task created
// filter the tasks array to find the task that matches the name of the currentTask state
  
// render helpful message if there is no task
if(!task) {
  return <p className={classes.task__message}>Your entered or selected task will appear here</p>
}

if(isEditing) {
  return (
    <section className={classes.task__pane}>
            <TaskEdit removeTask={removeTask} trigger={props.trigger} />
    </section>
  )
}



// render the details of that task to the taskPane section
return (
  <section className={classes.task__pane}  >
      <h2 className={classes.task__heading}>{task.name}</h2>
      <input 
      id='date'
      type='date'
      className={editClasses['form__input-edit--date']}
      name='date'
      value={task.date}
      onChange={changeTaskDateHandler}
      disable='true'
      >
      </input>
      <div className={classes["save-or-discard"]}>
        <button href="#" className={classes["save-btn"]} onClick={saveTask}>SAVE</button>        
        {/* <button onClick={removeTask}href="#" className={classes["delete-btn"]}>DELETE</button> */}
        <button onClick={cancelTaskHandler}href="#" className={classes["delete-btn"]}>CANCEL</button>
      </div>
          <form action="#" className={classes["form__status-btns-box"]}>
            <div className={classes["form__radio-group"]}  >
              <input
                id="incomplete"
                className={classes["form__input-radio"]}
                type="radio"
                value='incomplete'
                checked={task.status === 'incomplete'}
                onChange={statusChangeHandler}
              />
              <label htmlFor="incomplete" className={classes["form__radio-label--incomplete"]} >
                <span className={classes["form__radio-btn"]} ></span>
              </label>
            </div>

            <div className={classes["form__radio-group"]}  >
              <input
                id="in-progress"
                className={classes["form__input-radio"]}
                type="radio"
                name="status"
                value='in-progress'
                checked={task.status === 'in-progress'}
                onChange={statusChangeHandler}
              />
              <label  htmlFor="in-progress" className={classes["form__radio-label--in-progress"] }>
                <span className={classes["form__radio-btn"]}></span>
              </label>
            </div>
            <div className={classes["form__radio-group"]}>
              <input
                id="complete"
                className={classes["form__input-radio"]}
                type="radio"
                name="status"
                value='complete'
                checked={task.status === 'complete'}
                onChange={statusChangeHandler}
              />
              <label htmlFor="complete" className={classes["form__radio-label--complete"]}>
                <span className={classes["form__radio-btn"]}></span>
              </label>
            </div>

          </form>
    </section>
)
}

export default Task;