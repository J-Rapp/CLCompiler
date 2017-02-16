const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class EntryPage extends React.Component {
  constructor() {
    super();
    this.state = {
      token: this.getToken(),
      contentBoxes: [<BigHeader key='bigHeader' />]
    };
  }
  
  getToken() {
    const metas = document.getElementsByTagName('meta')

    for  (let i=0; i<metas.length; i++) {
      if (metas[i].getAttribute('name') === 'csrf-token') {
        return metas[i].getAttribute('content');
      }
    }
  }

  toggleBox(key, children) {
    let newBoxes
    const indexOf = this.state.contentBoxes.findIndex(box => box.key === key)

    if (indexOf === -1) {
      newBoxes = this.state.contentBoxes.concat([
        <ContentBox key={key}>{children}</ContentBox>
      ])
    } else {
      newBoxes = this.state.contentBoxes.slice()
      newBoxes.splice(indexOf, 1)
    }

    this.setState({
      contentBoxes: newBoxes
    });
  }

  componentDidMount() {
    const content =
      <div className='row text-center'>
        <div className='col-xs-12'>
          <button className='key-btn' onClick={() => this.toggleBox('loginForm', <LoginForm token={this.state.token}/>)}>
              Admin Access
          </button>
        </div>
      </div>

    this.toggleBox('adminButton', content)
  }

  render() {
    return (
      <div>
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