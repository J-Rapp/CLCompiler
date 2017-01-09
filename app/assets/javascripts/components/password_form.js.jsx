var PasswordForm = React.createClass({
  render: function() {
    return (
      <form id="new_user" action="/users/password" method="post">
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="authenticity_token" value={this.props.token} />

        <div>
          <label>Email</label><br />
          <input type="email" name="user[email]" />
        </div>

        <div>
          <input type="submit" value="Email instructions" />
        </div>
      </form>
    )
  }
})
