import { useSelector } from "react-redux";
// const tasks = useSelector(state => state.taskSlice.tasks);
// const currentTask = useSelector(state => state.taskSlice.currentTask);



// check for duplicate in tasks array
export const duplicateTask = (tasks, curTask) => {

const duplicate = tasks.some(task => task.name === curTask.name);

if(duplicate){
  return duplicate;
}
}


export const taskExists = (tasks, curTask) => { 
  return tasks.some(task => task.name === curTask?.name )
 }

const applyUpdates = (state,action) => { 
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

}