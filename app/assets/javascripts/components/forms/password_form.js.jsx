function PasswordForm(props) {
  return (
    <form action='/users/password'>
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
