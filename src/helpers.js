import { useSelector } from "react-redux";




// check for duplicate in tasks array
export const duplicateTask = (tasks, curTask) => {

const duplicate = tasks.some(task => task.name === curTask.name);

if(duplicate){
  return duplicate;
}
}



