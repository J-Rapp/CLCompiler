class EntryPage extends React.Component {
  constructor() {
    super();
    this.state = {
      token: this.getToken(),
      showLogin: false
    };
  }
  getToken() {
    var metas = document.getElementsByTagName('meta');
    for (var i=0; i<metas.length; i++) {
      if (metas[i].getAttribute('name') === 'csrf-token') {
        return metas[i].getAttribute('content');
      }
    }
  }
  handleClick() {
    if (this.state.showLogin) {
      this.setState({showLogin: false})
    } else {
      this.setState({showLogin: true})
    }
  }
  render() {
    return (
      <div>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <button className='btn key-btn' onClick={ () => this.handleClick() }>
                Admin Access
              </button>
            </div>
          </div>
        </div>
        { this.state.showLogin ? <LoginForm token={this.state.token}/> : null }
      </div>

    )
  }
}