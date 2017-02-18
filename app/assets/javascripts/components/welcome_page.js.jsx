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
      selectedAreaIDs: [],
      fetchingResults: false,
      craigslistResults: {},
      errors: null
    }
    this.changePlace = this.changePlace.bind(this)
    this.addBox = this.addBox.bind(this)
  }

  // Delivers subdomain array to controller params for search creation
  handSelectedAreasToForm() {
    return this.state.areas.filter((area) => {
      return this.state.selectedAreaIDs.contains(area.id)
    })
  }

  // Adds first animated box after page load
  componentDidMount() {
    this.addBox(
      'regionBox',
      <RegionBox 
        regions={ this.state.regions }
        selectRegion={ this.changePlace } />
    )
  }

  // Adds or updates content box from this.state.contentBoxes
  addBox(key, children) {
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

  // Updates `this.state.selectedRegion` and `this.state.selectedDistrict`
  changePlace(button) {
    switch(button.state.type) {
      case('region'):
        this.setState({
          selectedRegion: button.state.object
        }, function() {
          this.addBox(
            'districtBox',
            <DistrictBox
              districts={ this.state.districts }
              selectedRegion={ this.state.selectedRegion }
              selectDistrict={ this.changePlace } />
          )
        })
        break;
      case('district'):
        this.setState({
          selectedDistrict: button.state.object
        }, function() {
          this.addBox(
            'areaBox',
            <AreaBox
              selectedDistrict={ this.state.selectedDistrict }
              areas={ this.state.areas } />
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
