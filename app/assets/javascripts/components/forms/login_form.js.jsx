class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      email: '',
      password: '',
      failedAuth: false,
      errors: null
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
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
          password: this.state.password
          // May need a `remember_me` here
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
      <div className='container content-box'>
        <div className='row text-center'>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className='col-xs-12'>
                <input type='text' name='email' placeholder='email' className='form-input' onChange={(e) => this.handleChange(e)} />
                <input type='text' name='password' placeholder='password' className='form-input' onChange={(e) => this.handleChange(e)} />
                { this.state.failedAuth ? <ErrorDisplay errors={this.state.errors} /> : null }
            </div>
            <div className='col-xs-12'>
              <input type='submit' className='key-btn'></input>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
