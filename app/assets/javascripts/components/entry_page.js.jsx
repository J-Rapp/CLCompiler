const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class EntryPage extends React.Component {
  constructor() {
    super();
    this.state = {
      token: this.getToken(),
      contentBoxes: [],
      showLogin: false
    };
  }
  getToken() {
    const metas = document.getElementsByTagName('meta');
    for  (let i=0; i<metas.length; i++) {
      if (metas[i].getAttribute('name') === 'csrf-token') {
        return metas[i].getAttribute('content');
      }
    }
  }
  handleClick() {
    if (this.state.showLogin) {
      let newBoxes = this.state.contentBoxes.slice();
      newBoxes.splice(0, 1);
      console.log(newBoxes)
      this.setState({
        contentBoxes: newBoxes,
        showLogin: false
      });
    } else {
      const newBoxes = this.state.contentBoxes.concat([
        <ContentBox key={'loginForm'}><LoginForm token={this.state.token}/></ContentBox>
      ]);
      this.setState({
        contentBoxes: newBoxes,
        showLogin: true
      });
    }
  }
  render() {
    return (
      <div>

        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <button className='key-btn' onClick={() => this.handleClick()}>
                  Admin Access
              </button>
            </div>
          </div>
        </div>

        <ReactCSSTransitionGroup 
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          { this.state.contentBoxes }
        </ReactCSSTransitionGroup>

      </div>
    )
  }
}