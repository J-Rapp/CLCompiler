class AreaBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      areas: props.areas,
      selectedDistrict: props.selectedDistrict,
      selectedAreas: []
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(button) {
    console.log(button)
  }

  // Adds and Removes Area IDs from `this.state.selectedAreaIDs` Array
  toggleArea(area) {
    let stateArray = this.state.selectedAreaIDs
    let areaID = area.props.id

    if (stateArray.length === 0) {
      this.addBox('formBox', this.renderSearchForm())
    }

    // Removing
    if (area.props.isSelected && stateArray.contains(areaID)) {
      let i = stateArray.indexOf(areaID)
      stateArray.splice(i, 1)
      this.setState({
        selectedAreaIDs: stateArray
      })
    // Adding
    } else if (stateArray.length < 5) {
      this.setState({
        selectedAreaIDs: stateArray.concat([areaID])
      })
    }
  }

  // Needed when box is re-assigned by WelcomePage
  componentWillReceiveProps(props) {
    this.setState({
      selectedDistrict: props.selectedDistrict
    });
  }

  renderAreas() {
    return this.state.areas.map((area) => {
      if (area.district_id === this.state.selectedDistrict.id) {
        let isSelected = this.state.selectedAreas.contains(area)
        return <Button 
                 key={area.id}
                 type='area'
                 object={area}
                 select={this.handleSelect}
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