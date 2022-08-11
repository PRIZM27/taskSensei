import classes from './_Message.module.scss';

const Message = (props) => { 

  const messageClass = props.status === 'success' ? classes['message--success'] : props.status === 'error' ? classes['message--error']: '';


  return ( 
    <p status={props.messageStatus} className={messageClass}>{props.children}</p>
  )
}

export default Message;