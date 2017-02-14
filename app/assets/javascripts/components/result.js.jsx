class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Work In Progress ;)'
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <hr />
        </div>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
            { this.state.message }
            </div>
          </div>
        </div>
      </div>
    )
  }
}