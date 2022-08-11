// hooks imports 
import {useState, useEffect, useContext} from 'react';


import { useSelector, useDispatch } from 'react-redux';

// custom hook imports
import useHttp from '../../hooks/use-http';

// component imports
import TaskContext from '../../store/editing-context';
import TaskEdit from '../UI/TaskEdit';

// helper and config imports 
import { duplicateTask } from '../../helpers';
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

const [isEditing, setIsEditing] = useState(null);


const task = useSelector(state => state.taskSlice.currentTask);
const tasks = useSelector(state => state.taskSlice.tasks)

const dispatch = useDispatch();

const {isLoading, error, sendRequest} = useHttp();


const transformTask = (taskData) => { 
  // console.log(taskData, 'data forwarded to applyTasks');
  // console.log('DISPATCH NOT TRIGGERED');
  const generatedId = taskData.name;

  const createdTask = {
    id: generatedId,
    name: task.name,
    date: task.date,
    status: task.status,
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

  // show edit button (when clicked, gives abiliity to edit task details)
  setIsEditing(true);
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


useEffect(() => { 
  setIsEditing(duplicateTask(tasks, task));
},[task]);

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
            <TaskEdit removeTask={removeTask} />
    </section>
  )
}


// render the details of that task to the taskPane section
return (
  <section className={classes.task__pane}  >
      <h2 className={classes.task__heading}>{task.name}</h2>
      <p className={classes.task__date}>{task.date}</p>
      <div className={classes["save-or-discard"]}>
        <button href="#" className={classes["save-btn"]} onClick={saveTask}>SAVE</button>        
        <button onClick={removeTask}href="#" className={classes["delete-btn"]}>DELETE</button>
  
      </div>
          <form action="#" className={classes["form__status-btns-box"]}>
            <div className={classes["form__radio-group"]}  >
              <input
                id="incomplete"
                className={classes["form__input-radio"]}
                type="radio"
                
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
               
              />
              <label  htmlFor="in-progress" className={classes["form__radio-label--in-progress"] }>
              </label>
            </div>
            <div className={classes["form__radio-group"]}>
              <input
                id="complete"
                className={classes["form__input-radio"]}
                type="radio"
                name="status"
             
              />
              <label htmlFor="complete" className={classes["form__radio-label--complete"]}>
                <span className={classes["form__radio-btn"]}></span>
              </label>
            </div>

            <input
            className={classes["form__sub-task__input-field"]}
            type="search"
            placeholder="Type sub-task"
          />
          </form>
    </section>
)
}

export default Task;