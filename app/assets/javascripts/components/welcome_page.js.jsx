// Array function from Stack Overflow to help with `this.state.selectedAreaIDs`
Array.prototype.contains = function(obj) {
    var i = this.length;
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
      token: this.getToken(),
      regions: props.regions,
      districts: props.districts,
      areas: props.areas,
      selectedRegionID: 1,
      selectedDistrictID: 1,
      selectedAreaIDs: [1, 3],
      includesTerms: '',
      excludesTerms: '',
      minPrice: '',
      maxPrice: '',
      resultsIn: false,
      craigslistResults: {},
      errors: null
    };
  }

  // // Form Data & Sending

  // Grabs authenticity token from head/meta tag
  getToken() {
    var metas = document.getElementsByTagName('meta');
    for (var i=0; i<metas.length; i++) {
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
    var selectedAreaObjects = this.state.areas.filter((area) => {
      return this.state.selectedAreaIDs.contains(area.id)
    })
    return selectedAreaObjects.map((area) => {
      return area.subdomain
    })
  }

  // Executes AJAX Call
  handleSubmitForm(event) {
    event.preventDefault()
    var pageApp = this
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
        resultsIn: true,
        craigslistResults: data
      })
      $('html, body').animate({scrollTop:$(document).height()}, 1500)
    }).fail(function(data){
      pageApp.setState({
        // TODO: populate errors
        errors: null
      })
      $('html, body').animate({scrollTop:$(document).height()}, 1500)
    })
  }

  // // Altering State

  // Updates `this.state.selectedRegionID` and `this.state.selectedDistrictID`
  changePlace(location) {
    var type = location.props.type
    var newID = location.props.id
    var firstDistrictOfNewRegion = this.state.districts.find(function(district) {
      return district.region_id == newID
    })
    switch(type) {
      case('region'):
        this.setState({ 
          selectedRegionID: newID,
          selectedDistrictID: firstDistrictOfNewRegion.id
        })
        break;
      case('district'):
        this.setState({ 
          selectedDistrictID: newID
        })
        break;
    }
  }

  // Adds and Removes Area IDs from `this.state.selectedAreaIDs` Array
  toggleArea(area) {
    var stateArray = this.state.selectedAreaIDs
    var areaID = area.props.id
    // Removing
    if (area.props.isSelected && stateArray.contains(areaID)) {
      var i = stateArray.indexOf(areaID)
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
    var selectedRegionID = this.state.selectedRegionID
    return this.state.regions.find(function(region) {
      return region.id === selectedRegionID
    }).name
  }

  // Renders the selected District name above the rendered Areas ("cities")
  currentDistrictName() {
    var selectedDistrictID = this.state.selectedDistrictID
    return this.state.districts.find(function(district) {
      return district.id === selectedDistrictID
    }).name
  }

  // // Child Groups
  // // TODO: Break these out into Group Components?

  // Renders child Buttons for each Object in `this.state.selectedRegionIDs` Array
  renderRegions() {
    return this.state.regions.map((region) => {
      var isSelected = region.id === this.state.selectedRegionID;
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
        var isSelected = district.id === this.state.selectedDistrictID;
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
        var isSelected = this.state.selectedAreaIDs.contains(area.id)
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
      return <Result 
               key={result.url}
               url={result.url}
               title={result.title} 
               price={result.price} />
    })
  }

  // // JSX
  // // TODO: Consider ease of interpreting by assistive technologies

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmitForm(e)}>
          <div className='container content-box'>
            <div className='row text-center'>
              <div className='col-xs-12'>
                <h2>
                Region
                </h2>
              </div>
              <div className='col-xs-12'>
                <div className='btn-group-sm'>
                { this.renderRegions() }
                </div>
              </div>
            </div>
          </div>
          <div className='container content-box'>
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
          </div>
          <div className='container content-box'>
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
          </div>
          <div className='container content-box'>
            <div className='row text-center'>
              <div className='col-xs-12'>
                <h2>
                Selected Areas<br />
                <small><em>(up to 5)</em></small>
                </h2>
              </div>
              <div className='col-xs-12'>
                <div className='btn-group-sm'>
                { this.renderSelectedAreaIDs() }
                </div>
              </div>
            </div>
          </div>
          <div className='container content-box'>
            <div className='row text-center'>
              <div className='col-xs-12'>
                <h2>
                Search For Sale
                </h2>
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
          </div>
          <div className='container content-box'>
            <div className='row text-center'>
              <div className='col-xs-12'>
                <input type='submit' className='key-btn'></input>
              </div>
            </div>
          </div>
        </form>
        { this.state.resultsIn ? <HR /> : null }
        { this.state.resultsIn ? this.renderResults() : null }
        { this.state.errors ? "Errors - WIP" : null }
      </div>
    )
  }
}
