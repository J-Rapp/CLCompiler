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
    this.populateResults = this.populateResults.bind(this)
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
              populateResults= { this.populateResults } />
          )
        })
        break;
    }
  }

  // Creates or updates content boxes from this.state.contentBoxes
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

  populateResults(results) {
    // Filter by unique urls
    // TODO: move this to backend
    const uniqueResults = results.filter(function(result, index, self) {
      return self.findIndex(function(r) {
        return r.url === result.url || r.title === result.title
      }) === index
    })

    // First remove any current results if any are on the page
    this.setState({
      resultsIn: false,
      craigslistResults: []
    }, function() {
      // Populate new ones before render
      this.setState({
        resultsIn: true,
        craigslistResults: uniqueResults
      })
    })
  }

  renderResults() {
    let resultBoxes = this.state.craigslistResults.map((result) => {
      return <ContentBox key={result.url}>
               <Result 
                 key={result.url}
                 url={result.url}
                 title={result.title} 
                 price={result.price} />
             </ContentBox>
    })

    // Include <hr> tag at the beginning
    resultBoxes.unshift(<ResultsHR key='hr' />)
    return resultBoxes
  }

  render() {
    // $('html, body').animate({
    //   scrollTop: $('#start-results').offset().top + 'px'
    // }, 1500)
    return (
      <div>
        <ReactCSSTransitionGroup 
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          { this.state.contentBoxes }
        </ReactCSSTransitionGroup>
        { this.state.resultsIn ? this.renderResults() : null }
      </div>
    )
  }
}
