import classes from '../assets/sass/components/_StatusContainer.scss';



const StatusContainer = (props) => { 
return (
  <div className={props.className}>
   {props.children}
  </div>
)
}

export default StatusContainer;