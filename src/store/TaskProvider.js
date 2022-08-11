// import {useState, useCallback, useRef} from 'react'




// const TaskContextProvider = (props) => { 
  
//   const [tasks, setTasks] = useState([]);
//   const [taskInputVal, setTaskInputVal] = useState(null);
//   const [currentTask, setCurrentTask] = useState(null);  

//   const buildTask = (taskName) => {
    
//       const tempTask = {
//         name: taskName,
//         date: '00/00/1234',
//        //  month: '00',
//        //  day: '00',
//        //  year: '0000',
//         status: 'incomplete',
//        //  subTasks: [],
//        //  id: Math.random().toFixed(4),
//       };

//       // console.log(tempTask, 'task built with build task after post request');

//       return tempTask;
//     }
  
  
//   const getTask = (taskInput) => { 
   
//     // Check for duplicate task; terminate function if trued
//   if(tasks.length > 0){
//     if(tasks.some(task => task.name.trim().toLowerCase() === taskInput.trim().toLowerCase())){
//       console.log('Duplicate task exists. Please choose different name')
//       // terminate function if there is duplicate
//        return;
//     }
//   }
//     // capture task (string) entered by user
//     // set taskInput state to clean value
//     console.log(taskInput,'taskInput passed to Layout.js')
 
//     setTaskInputVal(taskInput); 
 
//     // build a new task to pass to Task.js 
//     // should render in taskPane
//     // user will have option to save or discard task before app adds it to array
//     setCurrentTask(buildTask(taskInput));
 
//  }
 
//  const setLocalStorage = useCallback(() => { 
 
//   // capture the length of the tasks array
//   let tasksLength = tasks.length;
 
//   // if the lengths are different
//   if(tasks.length !== tasksLength) { 
//     //  update localStorage to match most recent tasks array
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }
 
//  },[tasks])
 
//  // const getLocalStorage = useCallback( () => {
 
//  //   // condition when function should run
//  //   let storedTasks = localStorage.getItem('tasks');
 
//  //   storedTasks = JSON.parse(storedTasks);
 
//  //   if(tasks.length !== storedTasks.length){
//  //     setTasks(storedTasks);
//  //   }
 
//  // },[tasks])

  
 
//   const addNewTaskHandler = (newTask) => {
    
//     console.log('SAVE BTN CLICKED: ADD NEW TASK');

//     // merge new task with previous tasks state
//     if(tasks.length > 0){    

//     // update tasks array only after user saves the task in taskPane
//     // setTasks(prevTasks => [...prevTasks, currentTask]);
//     setTasks(prevTasks => [...prevTasks, newTask]);
//     } 
 
//     // simply add new task obj if there are no tasks in tasks array
//     if(tasks.length === 0){
//       setTasks([newTask])
//     }

//     // so that data is consistent, setCurrentTask again
//     // setCurrentTask(newTask);
 
//     // reset taskInput value
//     // setTaskInputVal(null);

//     // setTimeout(() => { 
//     //   localStorage.setItem('tasks', JSON.stringify(tasks));
 
//     // },1000)
 
//  }
 
 
 
//  const deleteTaskHandler = (taskObj) => { 
//  console.log(taskObj);
 
//  const updatedTasksArr = tasks.filter(task => task.name !== taskObj.name);
 
//  console.log(updatedTasksArr);
 
//  setTasks(updatedTasksArr);
//  setCurrentTask(null);
 
//  }
//     // console.log(taskInputVal);
//     // console.log(tasks);
//     // console.log(currentTask);
 
//  const currentTaskHandler = (taskObj) => { 
//   setCurrentTask(taskObj);
//  }

//  const setFetchedTasks = useCallback((fetchedTasks) => { 
//   setTasks(fetchedTasks);
//  },[])
 

// // const currentTaskHandler = (taskObj) => { 
// //  setCurrentTask(taskObj);
// // }

// // const confirmHandler = () => { 
// //  setConfirm(null);
// // }

// // const duplicate = taskInputVal?.trim().toLowerCase === tasks?.some(task => task.name.trim().toLowerCase());

// // const getStore = useCallback(() => { 
// //   setTimeout(() => { 

// //     let stored = localStorage.getItem('tasks');

// //     stored = JSON.parse(stored);

// //     if(stored){
// //       setTasks(stored);
// //     }

// //   }, 2000)
// // },[])

//  return (
//   <TaskContext.Provider value={{
//     taskInputVal,
//     tasks,
//     currentTask,
//     getTask,
//     buildTask,
//     addTask: addNewTaskHandler,
//     deleteTaskHandler,
//     makeCurrentTask: currentTaskHandler,
//     setFetchedTasks,
//     }}>
//     {props.children}
//   </TaskContext.Provider>
//  )

// }

// export default TaskContextProvider