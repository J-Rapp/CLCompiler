function PasswordForm(props) {
  return (
    <form id='new_user' action='/users/password' method='post'>
      <input name='utf8' type='hidden' value='&#x2713;' />
      <input type='hidden' name='authenticity_token' value={props.token} />

      <div className='form-field'>
        <label>Email</label><br />
        <input type='email' name='user[email]' />
      </div>

      <div className='form-field'>
        <input type='submit' className='btn btn-secondary' value='Send Instructions' />
      </div>
    </form>
  )
}
