var RegistrationForm = React.createClass({
  render: function() {
    return (
      <form id="new_user" action="/users" method="post">
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="authenticity_token" value={this.props.token} />

        <div>
          <label>Username</label><br />
          <input type="text" name="user[username]" />
        </div>

        <div>
          <label>Email</label><br />
          <input type="email" name="user[email]" />
        </div>

        <div>
          <label>Password</label>
          <em>(6 characters minimum)</em>
          <br />
          <input type="password" name="user[password]" />
        </div>

        <div>
          <label>Password confirmation</label><br />
          <input type="password" name="user[password_confirmation]" />
        </div>

        <div>
          <input type="submit" value="Sign up" />
        </div>
      </form>
    )
  }
})
