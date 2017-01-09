var RegistrationForm = React.createClass({
  render: function () {
    return (
      <form class="new_user" id="new_user" action="/users" accept-charset="UTF-8" method="post">
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="authenticity_token" value="NENEEUJhl3i3ENJXNHF0xp3y22nOAWheiTf82z97Fp3YzXKxHXqOQfV4NowUlAKsE2UMUXXCRh8xhqUOBfx/yQ==" />

        <div class='field'>
          <label for="user_username">Username</label><br />
          <input autofocus="autofocus" type="text" value="" name="user[username]" id="user_username" />
        </div>

        <div class='field'>
          <label for="user_email">Email</label><br />
          <input type="email" value="" name="user[email]" id="user_email" />
        </div>

        <div class='field'>
          <label for="user_password">Password</label>
          <em>(6 characters minimum)</em>
          <br />
          <input autocomplete="off" type="password" name="user[password]" id="user_password" />
        </div>

        <div class='field'>
          <label for="user_password_confirmation">Password confirmation</label><br />
          <input autocomplete="off" type="password" name="user[password_confirmation]" id="user_password_confirmation" />
        </div>

        <div class='actions'>
          <input type="submit" name="commit" value="Sign up" data-disable-with="Sign up" />
        </div>
      </form>
    )
  }
})
