class ContentBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      children: props.children
    }
  }

  componentWillReceiveProps(props) {
    console.log(props)
    this.setState({
      children: props.children 
    });
  }

  render() {
    return (
      <div>
        <div className='spacer'>
        </div>
        <div className='container content-box'>
          { this.state.children }
        </div>
      </div>
    )
  }
}
