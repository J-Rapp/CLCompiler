var RegistrationForm = React.createClass({
  render: function () {
    return (
      <form id="new_user" action="/users" method="post">
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="authenticity_token" value="NENEEUJhl3i3ENJXNHF0xp3y22nOAWheiTf82z97Fp3YzXKxHXqOQfV4NowUlAKsE2UMUXXCRh8xhqUOBfx/yQ==" />

        <div>
          <label>Username</label><br />
          <input type="text" value="" name="user[username]" id="user_username" />
        </div>

        <div>
          <label>Email</label><br />
          <input type="email" value="" name="user[email]" id="user_email" />
        </div>

        <div>
          <label>Password</label>
          <em>(6 characters minimum)</em>
          <br />
          <input type="password" name="user[password]" id="user_password" />
        </div>

        <div>
          <label>Password confirmation</label><br />
          <input type="password" name="user[password_confirmation]" id="user_password_confirmation" />
        </div>

        <div>
          <input type="submit" name="commit" value="Sign up" data-disable-with="Sign up" />
        </div>
      </form>
    )
  }
})
