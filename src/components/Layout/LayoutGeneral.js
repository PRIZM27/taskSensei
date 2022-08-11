import './_LayoutGeneral.scss';

const GeneralLayout = (props) => { 
  return (
    <section className='container'>
      {props.children}
    </section>
  )
}

export default GeneralLayout;