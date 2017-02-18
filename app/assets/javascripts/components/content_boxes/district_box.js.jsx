class DistrictBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      districts: props.districts,
      selectedRegion: props.selectedRegion,
      selectedDistrict: null
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.renderDistricts = this.renderDistricts.bind(this)
  }

  handleSelect(button) {
    this.setState({selectedDistrict: button.state.object})
    this.props.selectDistrict(button)
  }

  renderDistricts() {
    return this.state.districts.map((district) => {
      if (district.region_id === this.state.selectedRegion.id) {
        let isSelected = district === this.state.selectedDistrict;
        return <Button 
                 key={district.id}
                 type='district'
                 object={district}
                 handleSelect={this.handleSelect}
                 isSelected={isSelected}
               />
      }
    })
  }

  // Called when the WelcomePage re-renders and passes props down
  componentWillReceiveProps(props) {
    this.setState({
      selectedRegion: props.selectedRegion 
    });
  }

  render() {
    return (
      <div className='row text-center'>
        <div className='col-xs-12'>
          <h2>
            { this.state.selectedRegion.name }
          </h2>
        </div>
        <div className='col-xs-12'>
          <div className='btn-group-sm'>
            { this.renderDistricts() }
          </div>
        </div>
      </div>
    )
  }
}