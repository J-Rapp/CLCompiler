class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      email: '',
      password: '',
      isChecked: false
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
  render() {
    return (
      <form action='/users/sign_in' method='post'>
        <input name='utf8' type='hidden' value='&#x2713;' />
        <input type='hidden' name='authenticity_token' value={this.state.token} />

        <div className='form-field'>
          <label>Email</label><br />
          <input type='email' name='user[email]' value={this.state.email} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className='form-field'>
          <label>Password</label><br />
          <input type='password' name='user[password]' value={this.state.password} onChange={(e) => this.handleChange(e)} />
        </div>

        <div className='form-field'>
          <input name='user[remember_me]' type='hidden' value={this.state.isChecked ? '1' : '0'} />
          <input type='checkbox' name='user[remember_me]' onChange={() => this.toggleCheckbox()} />
          <label>Remember Me</label>
        </div>

        <div className='form-field'>
          <input type='submit' className='btn btn-secondary' value='Log In' />
        </div>
      </form>
    )
  }
}
