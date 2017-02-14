class EnterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      token: this.getToken(),
      showLogin: false,
      showRegistration: false,
      showPassword: false,
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
  handleClick(button) {
    this.setState({
      showPassword: false,
      showRegistration: false,
      showLogin: false
    });
    switch(button) {
      case('login'):
        this.setState({showLogin: true});
        break;
      case('register'):
        this.setState({showRegistration: true});
        break;
      case('password'):
        this.setState({showPassword: true});
        break;
    };
  }
  render() {
    return (
      <div className='container content-box'>
        <div className='row text-center'>
          <div className='col-xs-12'>
            <hr />
            <button className='btn btn-secondary' onClick={ () => this.handleClick('login') }>
              Log In
            </button>
            <button className='btn btn-secondary' onClick={ () => this.handleClick('register')}>
              Register
            </button>
            <button className='btn btn-secondary' onClick={ () => this.handleClick('password') }>
              Reset Password
            </button>
          </div>
        </div>
        <div className='row text-center'>
          <div className='col-xs-12'>
            <hr />
            { this.state.showLogin ? <LoginForm token={this.state.token}/> : null }
            { this.state.showRegistration ? <RegistrationForm token={this.state.token}/> : null }
            { this.state.showPassword ? <PasswordForm token={this.state.token}/> : null }
          </div>
        </div>
      </div>
    )
  }
}