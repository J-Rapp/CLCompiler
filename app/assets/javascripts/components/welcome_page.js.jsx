var WelcomePage = React.createClass({
  handleLogin() {
    ReactDOM.render(<LoginForm />, document.getElementById('form-area'))
  },
  handleRegistration() {
    ReactDOM.render(<RegistrationForm />, document.getElementById('form-area'))
  },
  handlePassword() {
    ReactDOM.render(<PasswordForm />, document.getElementById('form-area'))
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
