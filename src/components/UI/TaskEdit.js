import { useEffect, useState, useRef, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useHttp from '../../hooks/use-http';
import { taskActions } from '../../store/task-slice';

import { FIREBASE_URL } from '../../config/config';

import classes from '../../assets/sass/components/_Task.module.scss';
import editClasses from './_TaskEdit.module.scss';

const TaskEdit = (props) => {

  const dispatch = useDispatch();
  const [statusChanged, setStatusChanged] = useState('');

  const {sendRequest: sendPutRequest} = useHttp();

  const editingMode = useSelector(state => state.taskSlice.isEditing);
  const currentTask = useSelector(state => state.taskSlice.currentTask);
  const currentTaskStatus = useSelector(state => state.taskSlice.currentTask.status);
  const newStatus = useSelector(state => state.taskSlice.status);
  
  const taskId = useSelector(state => state.taskSlice.currentTask.id);

  const [newTaskName, setNewTaskName] = useState('');
  const [taskChanged, setTaskChanged] = useState(false);
  const taskRef = useRef();

  let taskDate;

  const changeTaskNameHandler = (e) => {
    // console.log(e.target.value);
  setNewTaskName(e.target.value);
  setTaskChanged(true);
  }

  const changeTaskDateHandler = (e) => {
    taskDate = e.target.value;
    dispatch(taskActions.setDate(e.target.value));

    sendPutRequest({
      url: `${FIREBASE_URL}/tasks/${taskId}.json`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
          name: newTaskName,
          date: e.target.value,
          status: currentTask.status,
      },
    });
  }

  const activateEditingHandler = () => { 
    dispatch(taskActions.setEditing(true));
  }

  const cancelEditHandler = () => { 
    dispatch(taskActions.setEditing(false));
  }

  const saveChangesHandler = (e) => { 
    e.preventDefault();
    setTaskChanged(true);
    if(newTaskName === ''){
      alert('Please enter at least 1 character for task name')
    }

    dispatch(taskActions.updateTaskName(newTaskName));
    dispatch(taskActions.setEditing(false));

    sendPutRequest({
      url: `${FIREBASE_URL}/tasks/${taskId}.json`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
          name: newTaskName,
          date: currentTask.date,
          status: currentTask.status,
      },
    });
   
  }


  const statusChangeHandler = (e) => { 
    setStatusChanged(true);
    dispatch(taskActions.updateStatus(e.target.value));

  }

  useEffect(() => { 
    if(statusChanged === true){
      setTimeout(() => { 
      sendPutRequest({
        url: `${FIREBASE_URL}/tasks/${taskId}.json`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
            name: currentTask.name,
            date: currentTask.date,
            status: currentTask.status,
        },
      });

      setStatusChanged(false)

    },500)

  }

  },[statusChanged, sendPutRequest, currentTask])
  

  
  const editBtn = <button href="#" className={classes["edit-btn"]} onClick={activateEditingHandler}>EDIT</button>;
  const saveChangesBtn = <button href="#" className={classes["save-btn"]} onClick={saveChangesHandler}>SAVE CHANGES</button>;    
  const cancelEditBtn = <button href="#" className={classes["save-btn"]} onClick={cancelEditHandler}>Cancel Edit</button>;   
  
//   const editForm = 
//   <div className={editClasses['form__editing']}>
//     <div className={classes['form__task-details__group']}>
//       <label className={editClasses['form__label--edit']} htmlFor='title'>
//         New Task Name
//       </label>
//       <input 
//       id='title'
//       type='text'
//       className={editClasses['form__input-edit--task']}
//       name='title'
//       placeholder={task.name}
//       onChange={changeTaskNameHandler}
//       >
//       </input>
      
//       <div className={classes['form__task-details__group']}>
//       <label className={editClasses['form__label--edit']} htmlFor='title'>
//         New Task Due Date
//       </label>
//       <input 
//       id='date'
//       type='date'
//       className={editClasses['form__input-edit--date']}
//       name='date'
//       value={task.date}
//       onChange={changeTaskDateHandler}
//       disable='true'

//       >
//       </input>
//     </div>
//   </div>
// </div>




const editForm = <div className={editClasses['form__editing']}>
  
      <input 
      ref= {taskRef}
      id='title'
      type='text'
      className={editClasses['form__input-edit--task']}
      name='title'
      placeholder={currentTask.name}
      // value={taskRef.current.value}
      onChange={changeTaskNameHandler}
      >
      </input>
      
      <input 
      id='date'
      type='date'
      className={editClasses['form__input-edit--date']}
      name='date'
      value={currentTask.date}
      onChange={changeTaskDateHandler}
      disable='true'
      >
      </input>
    </div>;




  return (
  <Fragment>
    {!editingMode && <h2 className={classes.task__heading}>{currentTask.name}</h2>}
     {!editingMode && <p className={classes.task__date}>{currentTask.date}</p>}
      {editingMode && editForm}
      <div className={classes["save-or-discard"]}>
        {editingMode ? saveChangesBtn : editBtn}
        {editingMode && cancelEditBtn}
      <button onClick={props.removeTask}href="#" className={classes["delete-btn"]}>DELETE</button>
      </div>
          <form action="#" className='form__status'>
            <div className={classes["form__status-btns-box"]}>
              <div className={classes["form__radio-group"]}>
                  <input
                    id="incomplete"
                    className={classes["form__input-radio"]}
                    type="radio"
                    name="status"
                    value='incomplete'
                    checked={currentTaskStatus === 'incomplete'}
                    onChange={statusChangeHandler}
                  />
                  <label htmlFor="incomplete" className={classes["form__radio-label--incomplete"]}>
                    <span className={classes["form__radio-btn"]}></span>
                  </label>
                </div>
                <div className={classes["form__radio-group"]}>
                  <input
                    id="in-progress"
                    className={classes["form__input-radio"]}
                    type="radio"
                    name="status"
                    value='in-progress'
                    checked={currentTaskStatus === 'in-progress'}
                    onChange={statusChangeHandler}
                  />
                  <label htmlFor="in-progress" className={classes["form__radio-label--in-progress"]}>
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
                    checked={currentTaskStatus === 'complete'}
                    onChange={statusChangeHandler}
                  />
                  <label htmlFor="complete" className={classes["form__radio-label--complete"]}>
                    <span className={classes["form__radio-btn"]}></span>
                  </label>
                </div>
              </div>
            </form>
  </Fragment>
    
         )
}

export default TaskEdit;