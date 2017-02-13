// Nifty Array function grabbed from Stack Overflow

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
      selectedAreaIDs: [1, 3]
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

  // Executes AJAX Call

  handleSubmitForm(event) {

  }

  // // Altering State


  // Handles text field inputs
  handleTextInput(event) {

  }

  // Updates this.state.selectedRegionID and this.state.selectedDistrictID
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

  // Adds and Removes Area IDs from this.state.selectedAreaIDs Array
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

  // // JSX
  // // TODO: Consider ease of interpreting by assistive technologies

  render() {
    return (
      <form>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <p>
              Region
              </p>
              <div className='btn-group-sm'>
              { this.renderRegions() }
              </div>
            </div>
          </div>
        </div>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <p>
              { this.currentRegionName() }
              </p>
              <div className='btn-group-sm'>
              { this.renderDistricts() }
              </div>
            </div>
          </div>
        </div>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <p>
              { this.currentDistrictName() }
              </p>
              <div className='btn-group-sm'>
              { this.renderAreas() }
              </div>
            </div>
          </div>
        </div>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <p>
              Selected Areas<br />
              <small><em>(up to 5)</em></small>
              </p>
              <div className='btn-group-sm'>
              { this.renderSelectedAreaIDs() }
              </div>
            </div>
          </div>
        </div>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <p>
              Search Criteria
              </p>
              <input type='text' placeholder='search terms'></input>
              <input type='text' placeholder='min price'></input>
              <input type='text' placeholder='max price'></input>
            </div>
          </div>
        </div>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <p>
              Submit Button / Loading Animation
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <hr />
        </div>
      </form>
    )
  }
}
