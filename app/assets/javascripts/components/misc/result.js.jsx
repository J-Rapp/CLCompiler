function Result(props) {
  return (
    <div className='row text-center'>
      <div className='col-xs-12'>
        <a href={props.url} target='_blank'>
          {props.title}
        </a><br/>
        {props.price}
      </div>
    </div>
  )
}
