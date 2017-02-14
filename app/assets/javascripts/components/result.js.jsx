class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      url: props.url,
      price: props.price
    }
  }

  // Called when the Welcome Page re-renders and passes props down
  componentWillReceiveProps(props) {
    this.setState({
      title: props.title,
      url: props.url,
      price: props.price
    })
  }

  // JSX
  render() {
    return (
      <div>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <a href={this.state.url} target='_blank'>
                {this.state.title}
              </a> - {this.state.price}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
