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
      selectedRegion: null,
      selectedDistrict: null,
      selectedAreas: [],
      fetchingResults: false,
      craigslistResults: {},
      errors: null
    }
    this.dynamicButtonSelection = this.dynamicButtonSelection.bind(this)
    this.createOrUpdateBox = this.createOrUpdateBox.bind(this)
    this.handleDeselect = this.handleDeselect.bind(this)
  }

  // Delivers subdomain array to controller params for search creation
  handSelectedAreasToForm() {
    return this.state.areas.filter((area) => {
      return this.state.selectedAreaIDs.contains(area.id)
    })
  }

  // Adds first animated box after page load
  componentDidMount() {
    this.createOrUpdateBox(
      'regionBox',
      <RegionBox 
        regions={ this.state.regions }
        selectRegion={ this.dynamicButtonSelection } />
    )
  }

  // Adds or updates content box from this.state.contentBoxes
  createOrUpdateBox(key, children) {
    let newBoxes = this.state.contentBoxes
    const indexOf = newBoxes.findIndex(box => box.key === key)
    if (indexOf === -1) {
      newBoxes = newBoxes.concat([
        <ContentBox key={key}>{children}</ContentBox>
      ])
    } else {
      newBoxes[indexOf] = <ContentBox key={key}>{children}</ContentBox>
    }
    this.setState({contentBoxes: newBoxes});
  }

  handleDeselect(areaButton) {
    console.log(areaButton)
  }

  // Updates `selectedRegion`, `selectedDistrict`, and `selectedAreas`
  dynamicButtonSelection(button, selectedAreas) {
    switch(button.state.type) {
      case('region'):
        this.setState({
          selectedRegion: button.state.object
        }, function() {
          this.createOrUpdateBox(
            'districtBox',
            <DistrictBox
              districts={ this.state.districts }
              selectedRegion={ this.state.selectedRegion }
              selectDistrict={ this.dynamicButtonSelection } />
          )
        })
        break;
      case('district'):
        this.setState({
          selectedDistrict: button.state.object
        }, function() {
          this.createOrUpdateBox(
            'areaBox',
            <AreaBox
              selectedDistrict={ this.state.selectedDistrict }
              areas={ this.state.areas }
              selectArea={ this.dynamicButtonSelection } />
          )
        })
        break;
      case('area'):
        this.setState({
          selectedAreas: selectedAreas
        }, function() {
          this.createOrUpdateBox(
            'formBox',
            <SearchForm
              selectedAreas={ this.state.selectedAreas }
              handleDeselect={ this.state.handleDeselect } />
          )
        })
        break;
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
    // console.log(this.state.selectedAreas)
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
