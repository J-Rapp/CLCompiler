class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      object: props.object,
      isSelected: props.isSelected,
      getsX: props.getsX
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleSelect(this)
  }

  // Called when the parent re-renders and passes props down
  componentWillReceiveProps(props) {
    this.setState({
      isSelected: props.isSelected 
    });
  }

  render() {
    return (
      <div className={this.state.isSelected ? "btn selected" : "btn"} onClick={this.handleClick}>
        <span className={ this.state.getsX ? "glyphicon glyphicon-remove" : ""} aria-hidden="true"></span>
        <div className={ this.state.getsX ? "selected-area" : "" }>
          { this.state.object.name }
        </div>
      </div>
    )
  }
}
