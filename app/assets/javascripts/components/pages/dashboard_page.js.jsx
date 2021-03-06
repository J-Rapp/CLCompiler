class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    }
  }
  handleLogout(event) {
    $.ajax({
      method: 'DELETE',
      url: '/logout'
    }).done(function(data){
      window.location.href = '/'
    })
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
            <button className='btn btn-secondary'>
              Edit Account
            </button>
            <button className='btn btn-secondary' onClick={(e) => this.handleLogout(e)}>
              Logout
            </button>
          </div>
          <div className='col-sm-12'>
            <button className='btn btn-secondary'>
              My Searches
            </button>
            <button className='btn btn-secondary'>
              New Search
            </button>
            <hr />
          </div>
        </div>
      </div>
    )
  }
}
