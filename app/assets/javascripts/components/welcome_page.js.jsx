var WelcomePage = React.createClass({
  getToken() {
    var metas = document.getElementsByTagName('meta');
    for (var i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") === 'csrf-token') {
        return metas[i].getAttribute("content");
      }
    }
  },
  handleLogin() {
    ReactDOM.render(<LoginForm token={this.getToken()}/>, document.getElementById('form-area'))
  },
  handleRegistration() {
    ReactDOM.render(<RegistrationForm token={this.getToken()}/>, document.getElementById('form-area'))
  },
  handlePassword() {
    ReactDOM.render(<PasswordForm token={this.getToken()}/>, document.getElementById('form-area'))
  },
  render: function() {
    return (
      <div>
        <h1>MegsList</h1>
        <h2>Let Meg search for you!</h2>
        <button onClick={(e) => this.handleLogin(e)}>
          Login
        </button>
        <button onClick={(e) => this.handleRegistration(e)}>
          Register
        </button>
        <button onClick={(e) => this.handlePassword(e)}>
          I Forgot My Password
        </button>
        <div id='form-area'>
        </div>
      </div>
    )
  }
});
