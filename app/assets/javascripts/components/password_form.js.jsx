var PasswordForm = React.createClass({
  render: function() {
    return (
      <form id="new_user" action="/users/password" method="post">
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="authenticity_token" value="pi/aj1NcBraBCaIEX56Bb59vYQh9wrBkozGX1uVxSByfz21iXwcN6WGYeDK0YFd9gMc5Tg3pHhDYV9T9Yo6N1A==" />

        <div>
          <label>Email</label><br />
          <input type="email" value="" name="user[email]" id="user_email" />
        </div>

        <div>
          <input type="submit" name="commit" value="Send me reset password instructions" data-disable-with="Send me reset password instructions" />
        </div>
      </form>
    )
  }
})
