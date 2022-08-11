import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  taskInputVal: '',
  task: null,
  tasks:[],
  currentTask: null,
  isEditing: false,
  status: null,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks(state, action){
      state.tasks = action.payload;
    },
    setTaskInputVal(state, action){
      state.taskInputVal = action.payload.val;
    },
    enteredTask(state, action){
   
      if(state.tasks.length > 0){
        
         // Check for duplicate task
        const duplicate = state.tasks.some(task => task.name.trim().toLowerCase() === action?.payload.trim().toLowerCase());
      
        // terminate function if true
        if(duplicate){
         console.log('Duplicate task exists. Please choose different name')

         return;
        }

        // set taskInputVal state to payload extracted
        state.taskInputVal = action.payload;
      }
    },
    buildTask(state, action) {
      const tempTask = {
        name: action.payload,
        date: '00/00/22',
       //  month: '00',
       //  day: '00',
       //  year: '0000',
        status: 'incomplete',
       //  subTasks: [],
       //  id: Math.random().toFixed(4),
      };


      state.currentTask = tempTask;
      state.taskInputVal = '';

      // return tempTask;
    },
    addNewTask(state, action){
    console.log('SAVE BTN CLICKED: ADD NEW TASK');
    console.log(action.payload, 'payload after save button clicked');
    console.log(state.tasks, 'state of tasks after save clicked');
      // merge new task with previous tasks state
      if(state.tasks.length > 0){    
      // update tasks array only after user saves the task in taskPane
      // setTasks(prevTasks => [...prevTasks, currentTask]);
      // setTasks(prevTasks => [...prevTasks, newTask]);
      state.tasks = state.tasks.concat(action.payload);

      } 
      // simply add new task obj if there are no tasks in tasks array
      if(state.tasks.length === 0){
        // setTasks([newTask])
       const updatedArr = [...state.tasks, action.payload];

       state.tasks = updatedArr;
      }
    },
    removeTask(state, action){

      // produce a new array filled with tasks that don't match currentTask
      // can delete only from task pane, so active task is always currentTask
      const updatedTasksArr = state.tasks.filter(task => task.id !== action.payload.id);

      // update state tasks array that doesn't include task just deleted
      state.tasks = updatedTasksArr;
      
      // reset currentTask so nothing appears in task pane
      state.currentTask = null;
    },
    makeCurrentTask(state, action){
      state.currentTask = action.payload;
    },
    setEditing(state, action){
      state.isEditing = action.payload;
    },

    updateTaskName(state, action){
      if(action.payload.trim().toLowerCase() === state.currentTask.name.trim().toLowerCase()){
        alert('TASK NAME EXISTS');
        return;
      }

      const updatedTask = {
        ...state.currentTask,
        name: action.payload,
      }

      const taskIndex = state.tasks.findIndex(task => task.id === state.currentTask.id)

      state.currentTask = updatedTask;
      
      state.tasks.splice(taskIndex,1, updatedTask);

    },
    updateTaskDate(state, action){
      state.currentTask.date = action.payload;
    },
    updateStatus(state, action){
      state.currentTask.status = action.payload;
      state.status = action.payload;
      console.log(action.payload);
    }
  }
})

export const taskActions = taskSlice.actions;

// export to use in store's index.js file
export default taskSlice;