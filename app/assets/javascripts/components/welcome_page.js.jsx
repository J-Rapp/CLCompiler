// Array extension to help with `this.state.selectedAreaIDs`
Array.prototype.contains = function(obj) {
    let i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

// Landing Page rendered on `views/welcome/index.html.erb`
// TODO: Add immutability-helper for state altering
class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentBoxes: [<ContentBox key='bigHeader'><BigHeader /></ContentBox>],
      token: this.getToken(),
      regions: props.regions,
      districts: props.districts,
      areas: props.areas,
      selectedRegionID: null,
      selectedDistrictID: null,
      selectedAreaIDs: [],
      includesTerms: '',
      excludesTerms: '',
      minPrice: '',
      maxPrice: '',
      fetchingResults: false,
      resultsIn: false,
      craigslistResults: {},
      errors: null
    };
  }

  // // Form Data & Sending

  // Grabs authenticity token from head/meta tag
  getToken() {
    let metas = document.getElementsByTagName('meta');
    for (let i=0; i<metas.length; i++) {
      if (metas[i].getAttribute('name') === 'csrf-token') {
        return metas[i].getAttribute('content');
      }
    }
  }

  // Handles text field inputs
  handleTextInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Delivers subdomain array to controller params for search creation
  getSubdomains() {
    let selectedAreaObjects = this.state.areas.filter((area) => {
      return this.state.selectedAreaIDs.contains(area.id)
    })
    return selectedAreaObjects.map((area) => {
      return area.subdomain
    })
  }

  // Executes AJAX Call
  handleSubmitForm(event) {
    event.preventDefault()
    let pageApp = this
    pageApp.setState({
      fetchingResults: true
    })
    $.ajax({
      type: 'POST',
      url: 'search',
      data: {
        authenticity_token: this.state.token,
        subdomains: this.getSubdomains(),
        search: {
          includes: this.state.includesTerms,
          excludes: this.state.excludesTerms,
          min_price: this.state.minPrice,
          max_price: this.state.maxPrice
        }
      }
    }).done(function(data){
      pageApp.setState({
        fetchingResults: false,
        resultsIn: true,
        craigslistResults: data
      })
      $('html, body').animate({
        scrollTop: $('#start-results').offset().top + 'px'
      }, 1500)
    }).fail(function(data){
      pageApp.setState({
        // TODO: populate errors
        errors: null
      })
      $('html, body').animate({
        scrollTop:$(document).height()
      }, 1500)
    })
  }

  // // Altering State

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
        this.setState({
          selectedRegionID: newID
        }, function() {
          this.toggleBox('districtBox', this.renderDistrictBox())
        })
        break;
      case('district'):
        this.setState({
          selectedDistrictID: newID
        }, function() {
          this.toggleBox('areaBox', this.renderAreaBox())
        })
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

  // // Page Content

  // Renders the selected Region ("country") name above the rendered Districts ("states")
  currentRegionName() {
    let selectedRegionID = this.state.selectedRegionID
    return this.state.regions.find(function(region) {
      return region.id === selectedRegionID
    }).name
  }

  // Renders the selected District name above the rendered Areas ("cities")
  currentDistrictName() {
    let selectedDistrictID = this.state.selectedDistrictID
    return this.state.districts.find(function(district) {
      return district.id === selectedDistrictID
    }).name
  }

  // // Content Boxes

  // Renders region box
  renderRegionBox() {
    return (
      <div className='row text-center'>
        <div className='col-xs-12'>
          <div className='btn-group-sm'>
          { this.renderRegions() }
          </div>
        </div>
      </div>
    )
  }

  renderDistrictBox(){
    return (
      <div className='row text-center'>
        <div className='col-xs-12'>
          <h2>
          { this.currentRegionName() }
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

  renderAreaBox() {
    return (
      <div className='row text-center'>
        <div className='col-xs-12'>
          <h2>
          { this.currentDistrictName() }
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

  renderSearchForm() {
    return (
      <form onSubmit={(e) => this.handleSubmitForm(e)}>
        <div className='row text-center'>
          <div className='col-xs-12'>
            <h2>
            Search For Sale
            </h2>
          </div>
        </div>

        <div className='row text-center'>
          <div className='col-xs-12'>
            <p>
            Selected Areas <small><em>(up to 5)</em></small>
            </p>
          </div>
          <div className='col-xs-12'>
            <div className='btn-group-sm'>
            { this.renderSelectedAreaIDs() }
            </div>
          </div>
        </div>

        <div className='row text-center'>
          <div className='col-xs-12'>
            <input name='includesTerms' type='text' onChange={(e) => this.handleTextInput(e)} placeholder='search for...'></input>
          </div>
        </div>

        <div className='row text-center'>
          <div className='col-xs-12'>
            <input name='excludesTerms' type='text' onChange={(e) => this.handleTextInput(e)} placeholder='skip if it includes...'></input>
          </div>
        </div>

        <div className='row text-center'>
          <div className='col-xs-6'>
            <input name='minPrice' type='text' onChange={(e) => this.handleTextInput(e)} placeholder='min price'></input>
          </div>
          <div className='col-xs-6'>
            <input name='maxPrice' type='text' onChange={(e) => this.handleTextInput(e)} placeholder='max price'></input>
          </div>
        </div>

        <div className='row text-center'>
          <div className='col-xs-12'>
            { this.state.fetchingResults ? 'Fetching results...' : <input type='submit' className='key-btn'></input> }
          </div>
        </div>
      </form>
    )
  }

  // // Child Groups inside content boxes

  // Renders child Buttons for each Object in `this.state.selectedRegionIDs` Array
  renderRegions() {
    return this.state.regions.map((region) => {
      let isSelected = region.id === this.state.selectedRegionID;
        return <Button 
                 key={region.id}
                 type='region'
                 id={region.id}
                 name={region.name}
                 select={this.changePlace.bind(this)}
                 isSelected={isSelected}
               />
    })
  }

  // Renders child Buttons for each Associated Object in `this.state.selectedDistrictIDs` Array
  renderDistricts() {
    return this.state.districts.map((district) => {
      if (district.region_id === this.state.selectedRegionID) {
        let isSelected = district.id === this.state.selectedDistrictID;
        return <Button 
                 key={district.id}
                 type='district'
                 id={district.id}
                 name={district.name}
                 select={this.changePlace.bind(this)}
                 isSelected={isSelected}
               />
      }
    })
  }

  // Renders child Buttons for each Associated Object in `this.state.areas` Array
  renderAreas() {
    return this.state.areas.map((area) => {
      if (area.district_id === this.state.selectedDistrictID) {
        let isSelected = this.state.selectedAreaIDs.contains(area.id)
        return <Button 
                 key={area.id}
                 id={area.id}
                 name={area.name}
                 select={this.toggleArea.bind(this)}
                 isSelected={isSelected}
               />
      }
    })
  }

  // Renders child Buttons for each Object in `this.state.selectedAreaIDs` Array
  renderSelectedAreaIDs() {
    return this.state.areas.map((area) => {
      if (this.state.selectedAreaIDs.contains(area.id)) {
        return <Button 
                 key={area.id}
                 id={area.id}
                 name={area.name}
                 select={this.toggleArea.bind(this)}
                 isSelected='true'
                 getsX='true'
               />
      }
    })
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

  // // JSX
  // // TODO: Consider ease of interpreting by assistive technologies

  // Landing page - initialize region box animation

  componentDidMount() {
    const content = this.renderRegionBox()
    this.toggleBox('regionBox', content)
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
        { this.state.errors ? "Errors - WIP" : null }
      </div>
    )
  }
}
