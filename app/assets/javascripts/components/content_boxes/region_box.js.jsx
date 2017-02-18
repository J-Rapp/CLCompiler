class RegionBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regions: props.regions,
      selectedRegion: null
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(button) {
    this.setState({selectedRegion: button.state.object})
    this.props.selectRegion(button)
  }

  renderRegions() {
    // Array of Buttons
    return this.state.regions.map((region) => {
      // Check if the region is currently selected
      const isSelected = (region === this.state.selectedRegion);
      return <Button 
               key={region.id}
               type='region'
               object={region}
               handleSelect={this.handleSelect}
               isSelected={isSelected}
             />
    })
  }

  render() {
    return(
      <div className='row text-center'>
        <div className='col-xs-12'>
          <div className='btn-group-sm'>
            { this.renderRegions() }
          </div>
        </div>
      </div>
    )
  }
}