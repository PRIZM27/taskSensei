import {createSlice} from '@reduxjs/toolkit';

const month = new Date().toLocaleString('en-US', {month: '2-digit'});
const day = new Date().toLocaleString('en-US', {day: '2-digit'});
const year = new Date().getFullYear();

const initialState = {
  taskInputVal: '',
  task: null,
  tasks:[],
  filteredTasks: [],
  currentTask: null,
  isEditing: null,
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
      state.isEditing = false;
    },
    setDate(state, action){
      state.currentTask.date = action.payload;
    },
    enteredTask(state, action){
      
      // search  for a duplicate if at least 1 task already exists
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
        date: `${year}-${month}-${day}`,
        status: 'incomplete',
      };


      state.task = tempTask;
      state.taskInputVal = '';

      // return tempTask;
    },
    addNewTask(state, action){
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
    cancelTask(state){
      state.task = null;
      state.currentTask = null;
      state.taskInputVal = '';
    },
    removeTask(state, action){

      // produce a new array filled with tasks that don't match currentTask
      // can delete only from task pane, so active task is always currentTask
      const updatedTasksArr = state.tasks.filter(task => task.id !== action.payload.id);

      // update state tasks array that doesn't include task just deleted
      state.tasks = updatedTasksArr;
      
      // reset currentTask so nothing appears in task pane
      state.currentTask = null;
      state.isEditing = false;
    },
    makeCurrentTask(state, action){
      state.currentTask = action.payload;
    },
    setEditing(state, action){
      state.isEditing = action.payload;
    },

    updateTaskName(state, action){

      // prevent user from re-naming task to already existing task name
      if(action.payload.trim().toLowerCase() === state.currentTask.name.trim().toLowerCase()){
        alert('TASK NAME EXISTS');
        return;
      }

      // build new obj: include new name and other unchanged properties
      const updatedTask = {
        name: action.payload,
        date: state.currentTask.date,
        status: state.currentTask.status,
        id: state.currentTask.id,
      }

      // update the current task with new name
      state.currentTask = updatedTask;

      // reflect changes in the tasks array
      const taskIndex = state.tasks.findIndex(task => task.id === state.currentTask.id);

      const tasksCopy = [...state.tasks];

      tasksCopy.splice(taskIndex,1, updatedTask);

      state.tasks = tasksCopy;

      

    },
    updateTaskDate(state, action){
      state.currentTask.date = action.payload;
    },
    updateStatus(state, action){
      console.log(action.payload);
      // state.status = action.payload;

      // change progress status of an already existing task
      const updatedTask = {
          name: state.currentTask.name,
          date: state.currentTask.date,
          status: action.payload,
          id: state.currentTask.id,
        }

        state.currentTask = updatedTask;

        const taskIndex = state.tasks.findIndex(task => task.id === state.currentTask.id);
        console.log(taskIndex); 

        state.tasks.splice(taskIndex,1, updatedTask);

      // state.currentTask.status = action.payload;

      // update tasks to reflect change
      // if(state.tasks.some(task => task.name === state.currentTask.name )){

      // state.status = action.payload;
      
      // const updatedTask = {
      //   name: state.currentTask.name,
      //   date: state.currentTask.date,
      //   status: action.payload,
      // }
      // // state.currentTask = updatedTask;

      //   const taskIndex = state.tasks.findIndex(task => task.id === state.currentTask.id);

      //   state.tasks.splice(taskIndex,1, updatedTask);
      // }
      
    },
    filterSearchResults(state,action) { 
      // create new array based on matches to entered value
      const taskNameArray = state.tasks.filter(task => task.name.trim().toLowerCase().includes(action.payload.trim().toLowerCase()));

      [...state.filteredTasks] = [...taskNameArray];
    }
  }
})

export const taskActions = taskSlice.actions;

// export to use in store's index.js file
export default taskSlice;