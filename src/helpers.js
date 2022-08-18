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


