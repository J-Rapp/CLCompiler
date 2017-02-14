class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      url: props.url,
      price: props.price
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.title,
      url: props.url,
      price: props.price
    })
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
             {this.state.title}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
