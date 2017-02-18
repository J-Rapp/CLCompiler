class AreaBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      areas: props.areas,
      selectedDistrict: props.selectedDistrict,
      selectedAreas: props.selectedAreas
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  // Adds and Removes Areas from `this.state.selectedAreas` Array
  handleSelect(button) {
    let stateArray = this.state.selectedAreas
    const area = button.state.object
    const isSelected = button.state.isSelected

    // Removing
    if (isSelected && stateArray.contains(area)) {
      const i = stateArray.indexOf(area)
      stateArray.splice(i, 1)
    // Adding
    } else if (stateArray.length < 5) {
      stateArray = stateArray.concat([area])
    }

    this.setState({
      selectedAreas: stateArray
    }, function() {
      // Lift selectedAreas up to WelcomePage
      this.props.selectArea(button, this.state.selectedAreas)
    })
    
  }

  // Called when the WelcomePage re-renders and passes props down
  componentWillReceiveProps(props) {
    this.setState({
      selectedDistrict: props.selectedDistrict
    });
  }

  renderAreas() {
    return this.state.areas.map((area) => {
      if (area.district_id === this.state.selectedDistrict.id) {
        const isSelected = this.state.selectedAreas.contains(area)
        return <Button 
                 key={area.id}
                 type='area'
                 object={area}
                 handleSelect={this.handleSelect}
                 isSelected={isSelected}
               />
      }
    })
  }

  render(){
    return (
      <div className='row text-center'>
        <div className='col-xs-12'>
          <h2>
            { this.state.selectedDistrict.name }
          </h2>
        </div>
        <div className='col-xs-12'>
          <div className='btn-group-sm'>
            { this.renderAreas() }
          </div>
        </div>
      </div>
    )
  }
}