class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    }
  }
  render() {
    return (
      <div className='container content-box'>
        <div className='row text-center'>
          <div className='col-sm-12'>
            <h1>{ this.state.user.username }'s Dashboard</h1>
          </div>
          <div className='col-sm-12'>
            <hr />
            <p><a href='/users/edit'>Edit Account</a></p>
            <p><a href='/logout'>Logout</a></p>
            <p>My Searches</p>
            <p>New Search</p>
          </div>
        </div>
      </div>
    )
  }
}
