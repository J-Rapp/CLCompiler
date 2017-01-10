class WelcomePage extends React.Component {
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
    console.log(this.state.token)
  }
  render() {
    return (
      <div className='container content-box'>
        <div className='row text-center'>
          <div className='col-xs-12'>
            <h1>MegsList</h1>
          </div>
          <div className='col-xs-12'>
            <h2><em>Let Meg take care of it!</em></h2>
          </div>
        </div>
        <div className='row text-center'>
          <div className='col-xs-12'>
            <hr />
            <p>
            Automatically search multiple Craigslist cities at once, 
            and get emails when new listings are posted. Log in or 
            create an account to start your search.
            </p>
          </div>
        </div>
        <div className='row text-center'>
          <div className='col-xs-12'>
            <button className='btn btn-secondary' onClick={() => this.handleClick('login')}>
              Log In
            </button>
            <button className='btn btn-secondary' onClick={() => this.handleClick('register')}>
              Register
            </button>
            <button className='btn btn-secondary' onClick={() => this.handleClick('password')}>
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
