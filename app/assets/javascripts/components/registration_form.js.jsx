var RegistrationForm = React.createClass({
  render: function() {
    return (
      <div>
        <hr />
        <form id='new_user' action='/users' method='post'>
          <input name='utf8' type='hidden' value='&#x2713;' />
          <input type='hidden' name='authenticity_token' value={this.props.token} />

          <div className='form-field'>
            <label>Username</label><br />
            <input type='text' name='user[username]' />
          </div>

          <div className='form-field'>
            <label>Email</label><br />
            <input type='email' name='user[email]' />
          </div>

          <div className='form-field'>
            <label>Password <em>(6 character minimum)</em></label>
            <br />
            <input type='password' name='user[password]' />
          </div>

          <div className='form-field'>
            <label>Password Confirmation</label><br />
            <input type='password' name='user[password_confirmation]' />
          </div>

          <div className='form-field'>
            <input type='submit' className='btn btn-secondary' value='Sign Up' />
          </div>
        </form>
      </div>
    )
  }
})
