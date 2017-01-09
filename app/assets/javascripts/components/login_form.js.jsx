var LoginForm = React.createClass({
  render: function() {
    return (
      <form class="new_user" id="new_user" action="/users/sign_in" accept-charset="UTF-8" method="post">
        <input name="utf8" type="hidden" value="&#x2713;" />
        <input type="hidden" name="authenticity_token" value="nkGtAIAhwGF4cl6RfV5LHBk+vSKyfbKsIWuMLYT9MVLx7Dc4t6fxUuue60KnM3oRy7Qqq29cuo1tqdSX+s4TqA==" />
        <div class="field">
          <label for="user_email">Email</label><br />
          <input autofocus="autofocus" type="email" value="" name="user[email]" id="user_email" />
        </div>

        <div class="field">
          <label for="user_password">Password</label><br />
          <input autocomplete="off" type="password" name="user[password]" id="user_password" />
        </div>

          <div class="field">
            <input name="user[remember_me]" type="hidden" value="0" /><input type="checkbox" value="1" name="user[remember_me]" id="user_remember_me" />
            <label for="user_remember_me">Remember me</label>
          </div>

        <div class="actions">
          <input type="submit" name="commit" value="Log in" data-disable-with="Log in" />
        </div>
      </form>
    )
  }
});
