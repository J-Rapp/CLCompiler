var LoginForm = React.createClass({
  render: function() {
    return (
      <form id="new_user" action="/users/sign_in" method="post">
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="authenticity_token" value={this.props.token} />

        <div>
          <label>Email</label><br />
          <input type="email" name="user[email]" />
        </div>

        <div>
          <label>Password</label><br />
          <input type="password" name="user[password]" />
        </div>

        <div>
          <input name="user[remember_me]" type="hidden" value="0" />
          <input type="checkbox" name="user[remember_me]" />
          <label>Remember me</label>
        </div>

        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    )
  }
});
