function LoginForm(props) {
  return (
    <div>
      <hr />
      <form id='new_user' action='/users/sign_in' method='post'>
        <input name='utf8' type='hidden' value='&#x2713;' />
        <input type='hidden' name='authenticity_token' value={props.token} />

        <div className='form-field'>
          <label>Email</label><br />
          <input type='email' name='user[email]' />
        </div>

        <div className='form-field'>
          <label>Password</label><br />
          <input type='password' name='user[password]' />
        </div>

        <div className='form-field'>
          <input name='user[remember_me]' type='hidden' value='0' />
          <input type='checkbox' name='user[remember_me]' />
          <label>Remember Me</label>
        </div>

        <div className='form-field'>
          <input type='submit' className='btn btn-secondary' value='Log In' />
        </div>
      </form>
    </div>
  )
}
