function Region(props) {
  return (
    <button className='area-div' onClick={props.changeRegion}>
      { props.name }
    </button>
  )
}