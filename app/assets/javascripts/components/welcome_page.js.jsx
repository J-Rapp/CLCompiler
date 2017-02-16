// Array extension to help with `this.state.selectedAreaIDs`

Array.prototype.contains = function(obj) {
    let i = this.length
    while (i--) {
        if (this[i] === obj) {
            return true
        }
    }
    return false
}

// Landing Page rendered on `views/welcome/index.html.erb`
// TODO: Add immutability-helper for state altering

class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contentBoxes: [<ContentBox key='bigHeader'><BigHeader /></ContentBox>],
      regions: props.regions,
      districts: props.districts,
      areas: props.areas,
      selectedRegionID: null,
      selectedDistrictID: null,
      selectedAreaIDs: [],
      fetchingResults: false,
      craigslistResults: {},
      errors: null
    };
  }

  // Delivers subdomain array to controller params for search creation
  handSelectedAreasToForm() {
    return this.state.areas.filter((area) => {
      return this.state.selectedAreaIDs.contains(area.id)
    })
  }

  // Landing page - initialize region box animation
  componentDidMount() {
    this.toggleBox(
      'regionBox',
      <RegionBox 
        regions={ this.state.regions }
        selectedRegionID={ this.state.selectedRegionID }
        selectRegion={ this.changePlace } />
    )
  }

  // Adds (or removes) content box from this.state.contentBoxes
  toggleBox(key, children) {
    let newBoxes
    const indexOf = this.state.contentBoxes.findIndex(box => box.key === key)

    if (indexOf === -1) {
      newBoxes = this.state.contentBoxes.concat([
        <ContentBox key={key}>{children}</ContentBox>
      ])
      this.setState({
        contentBoxes: newBoxes
      });
    } else {
      // newBoxes = this.state.contentBoxes.slice()
      // newBoxes.splice(indexOf, 1)
    }
  }

  // Updates `this.state.selectedRegionID` and `this.state.selectedDistrictID`
  changePlace(location) {
    let type = location.props.type
    let newID = location.props.id
    switch(type) {
      case('region'):
        this.setState({selectedRegionID: newID})
        break;
      case('district'):
        this.setState({selectedDistrictID: newID})
        break;
    }
  }

  // Adds and Removes Area IDs from `this.state.selectedAreaIDs` Array
  toggleArea(area) {
    let stateArray = this.state.selectedAreaIDs
    let areaID = area.props.id

    if (stateArray.length === 0) {
      this.toggleBox('formBox', this.renderSearchForm())
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

  // Renders child Results for each Object in `this.state.craigslistResults` Object
  renderResults() {
    return this.state.craigslistResults.map((result) => {
      return 
      <ContentBox key={result.url}>
        <Result 
          key={result.url}
          url={result.url}
          title={result.title} 
          price={result.price} />
      </ContentBox>
    })
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup 
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          { this.state.contentBoxes }
        </ReactCSSTransitionGroup>
        { this.state.resultsIn ? <HR /> : null }
        { this.state.resultsIn ? this.renderResults() : null }
        { this.state.errors ? "An error occurred" : null }
      </div>
    )
  }
}
