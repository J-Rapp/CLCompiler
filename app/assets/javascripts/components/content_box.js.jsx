function ContentBox(props) {
  return (
    <div>
      <div className='spacer'>
      </div>
      <div className='container content-box'>
      {props.children}
      </div>
    </div>
  )
}
