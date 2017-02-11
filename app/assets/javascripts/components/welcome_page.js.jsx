class WelcomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      token: this.getToken()
    };
  }

  getToken() {
    var metas = document.getElementsByTagName('meta');
    for (var i=0; i<metas.length; i++) {
      if (metas[i].getAttribute('name') === 'csrf-token') {
        return metas[i].getAttribute('content');
      }
    }
  }

  render() {
    return (
      <div className='container content-box'>
        <div className='row text-center'>
          <div className='col-xs-12'>
          </div>
        </div>
      </div>
    )
  }
}
