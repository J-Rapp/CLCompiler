class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      id: props.id,
      isSelected: props.isSelected,
      handleClick: () => props.changeRegion(this)
    }
  }
  componentWillReceiveProps(props) {
  this.setState({
    isSelected: props.isSelected 
  });
  }
  render() {
    return (
      <div className={this.state.isSelected ? "btn selected" : "btn"} onClick={this.state.handleClick}>
        { this.state.name }
      </div>
    )
  }
}