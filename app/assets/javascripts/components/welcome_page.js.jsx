// Array extensions

Array.prototype.contains = function(obj) {
    let i = this.length
    while (i--) {
        if (this[i] === obj) {
            return true
        }
    }
    return false
}

Array.prototype.uniqChildren = function() {
  return this.reduce(function(allChildren, currentChild) { 
    console.log(currentChild)
    if (allChildren.indexOf(currentChild) === -1) allChildren.push(currentChild); 
    return allChildren;
  }, [] );
}

// Landing Page rendered on `views/welcome/index.html.erb`
// TODO: Add immutability-helper for state altering

class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // Adding or deleting boxes triggers the CSSTransitionGroup animation
      contentBoxes: [<ContentBox key='bigHeader'><BigHeader /></ContentBox>],
      regions: props.regions,
      districts: props.districts,
      areas: props.areas,
      selectedRegion: null,
      selectedDistrict: null,
      selectedAreas: [],
      resultsIn: false,
      craigslistResults: []
    }
    this.dynamicButtonSelection = this.dynamicButtonSelection.bind(this)
    this.createOrUpdateBox = this.createOrUpdateBox.bind(this)
    this.handleResults = this.handleResults.bind(this)
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
              selectArea={ this.dynamicButtonSelection }
              selectedAreas={ this.state.selectedAreas } />
          )
        })
        break;
      case('area'):
        this.setState({
          selectedAreas: selectedAreas
        }, function() {
          this.createOrUpdateBox(
            'areaBox',
            <AreaBox
              selectedDistrict={ this.state.selectedDistrict }
              areas={ this.state.areas }
              selectArea={ this.dynamicButtonSelection }
              selectedAreas={ this.state.selectedAreas } />
          )
          this.createOrUpdateBox(
            'formBox',
            <SearchForm
              selectedAreas={ this.state.selectedAreas }
              selectArea={ this.dynamicButtonSelection }
              handleResults= { this.handleResults } />
          )
        })
        break;
    }
  }

  // Creates or updates content boxes from this.state.contentBoxes
  createOrUpdateBox(key, children) {
    let newBoxes = this.state.contentBoxes
    const indexOf = newBoxes.findIndex(box => box.key === key)

    // Create a new box
    if (indexOf === -1) {
      newBoxes = newBoxes.concat([
        <ContentBox key={key}>{children}</ContentBox>
      ])
      this.setState({contentBoxes: newBoxes});
      // Scroll to new box after render
      $('#app').animate({scrollTop: $('#search-animation').height()}, 1000, 'linear');
    } else {
      // Update an already existing box
      newBoxes[indexOf] = <ContentBox key={key}>{children}</ContentBox>
      this.setState({contentBoxes: newBoxes});
    }
  }

  handleResults(results) {
    // Filter out duplicate urls and titles
    // TODO: move this to backend
    const uniqueResults = results.filter(function(result, index, self) {
      return self.findIndex(function(r) {
        return r.url === result.url || r.title === result.title
      }) === index
    })

    this.setState({
      resultsIn: true,
      craigslistResults: uniqueResults
    })
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup 
          component='div'
          id='search-animation'
          transitionName='fade'
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          { this.state.contentBoxes }
        </ReactCSSTransitionGroup>
        { this.state.resultsIn ? <Results results={ this.state.craigslistResults } /> : null }
      </div>
    )
  }
}
