
import {useState, useCallback} from 'react';

// http request custom hook
const useHttp = () => {

  /*forward these states via props to other components to conditionally render content */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // build the generic http request to server
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try { 
      /* use second param of fetch to be flexible, with GET has default request type */
      const response = await fetch(
        requestConfig.url, {

        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
    
      if(!response.ok){
        throw new Error('Get request not successful');
      }
  
      const tasksData = await response.json();
      // console.log(tasksData, ' DATA FROM HTTP RESPONSE')
  
      //call function paramater that will transform received data specific to the type of component using this hook
      applyData(tasksData)
  
    } catch(error){
      setError(error.message || 'Something went wrong')
    }
  
    setIsLoading(false)
  },[])
    
  
  return { 
      isLoading,
      error, 
      sendRequest,
    }
}


export default useHttp;