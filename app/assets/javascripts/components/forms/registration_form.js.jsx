class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      failsCreate: false,
      errors: null
    }
  }
  handleUsername(event) {
    this.setState({
      username: event.target.value 
    })
  }
  handleEmail(event) {
    const self = this
    this.setState({
      email: event.target.value
    }, function() {
      $.ajax({
        method: 'GET',
        url: '/check_user',
        data: {
          email: this.state.email
        }
      }).done(function(data){
        console.log(data),
        self.setState({
          failsCreate: false,
          errors: null
        })
      }).fail(function(data){
        console.log(data),
        self.setState({
          failsCreate: true,
          errors: 'Account already exists for this email.'
        })
      })
    })
  }
  handlePassword(event) {
    this.setState({
      password: event.target.value
    }, function() {
      if (this.state.password.length <= 6) {
        this.setState({
          failsCreate: true,
          errors: 'Password must longer than 6 characters.'
        })
      } else {
        this.setState({
          failsCreate: false,
          errors: null
        })
      }
    })
  }
  handleConfirmation(event) {
    this.setState({
      password_confirmation: event.target.value
    }, function() {
      if (this.state.password !== this.state.password_confirmation) {
        this.setState({
          failsCreate: true,
          errors: 'Passwords do not match.'
        })
      } else {
        this.setState({
          failsCreate: false,
          errors: null
        })
      }
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    const self = this
    $.ajax({
      type: 'POST',
      url: '/users',
      data: {
        authorization_token: this.state.token,
        user: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        }
      }
    }).done(function(data) {
      window.location.href = '/dashboard'
    }).fail(function(data) {
      self.setState({
        failsCreate: true,
        errors: 'An error occurred.'
      })
    })
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className='form-field'>
          <label>Username</label><br />
          <input type='text' name='username' onChange={(e) => this.handleUsername(e)} />
        </div>

        <div className='form-field'>
          <label>Email</label><br />
          <input type='email' name='email' onBlur={(e) => this.handleEmail(e)} />
        </div>

        <div className='form-field'>
          <label>Password</label>
          <br />
          <input type='password' name='password' onChange={(e) => this.handlePassword(e)} />
        </div>

        <div className='form-field'>
          <label>Password Confirmation</label><br />
          <input type='password' name='password_confirmation' onChange={(e) => this.handleConfirmation(e)} />
        </div>

        { this.state.failsCreate ? <ErrorDisplay errors={this.state.errors} /> : null }

        <div className='form-field'>
          <input type='submit' className='btn btn-secondary' value='Sign Up' />
        </div>
      </form>
    )
  }
}
