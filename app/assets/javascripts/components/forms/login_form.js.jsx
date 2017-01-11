class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      email: '',
      password: '',
      isChecked: false,
      failedAuth: false,
      errors: null
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.type]: event.target.value
    })
  }
  toggleCheckbox() {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    const self = this
    $.ajax({
      type: 'POST',
      url: '/users/sign_in',
      data: {
        authenticity_token: this.state.token,
        user: {
          email: this.state.email,
          password: this.state.password,
          remember_me: this.state.isChecked ? '1' : '0'
        }
      }
    }).done(function(data) {
      window.location.href = '/dashboard'
    }).fail(function(data) {
      self.setState({
        failedAuth: true,
        errors: data.responseText
      })
    });
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className='form-field'>
          <label>Email</label><br />
          <input type='email' value={this.state.email} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className='form-field'>
          <label>Password</label><br />
          <input type='password' value={this.state.password} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className='form-field'>
          <input type='checkbox' value={this.state.isChecked} onChange={() => this.toggleCheckbox()} />
          <label>Remember Me</label>
        </div>

        { this.state.failedAuth ? <ErrorDisplay errors={this.state.errors} /> : null }

        <div className='form-field'>
          <input type='submit' className='btn btn-secondary' value='Log In' />
        </div>
      </form>
    )
  }
}
