import classes from './Sort.module.scss';

const Sort = (props) => { 
  return(

<form id='sort--date' action='#'>
<div className={classes.sort__controls}>
    <label htmlFor='sort--date' id='Sort' className={classes.sort__label}>Sort: Date</label>
  
    <select className={classes.sort__select} id='sort--date' name='date-sort-select' onChange={props.onChange}>
      <option defaultValue='selected' >-- Date Sort Type--</option>
       <option  value='ascendending'>Soonest to Furthest</option>
       <option value='descending'>Furthest to Soonest</option>
       <option value='created'>Date Created</option>
    </select>
  </div>
</form>)
  
}

export default Sort;