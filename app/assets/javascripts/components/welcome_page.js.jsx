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

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.getToken(),
      regions: props.regions,
      districts: props.districts,
      areas: props.areas,
      region: 1,
      district: 1,
      selectedAreas: [1, 2, 3, 5]
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

  // Updates state for either current Region or District
  changePlace(location) {
    this.setState({ 
      [location.props.type]: location.props.id
    })
  }

  // Adds Area IDs to the selectedAreas state array
  addArea(area) {
    // if (this.state.selectedAreas.length <= 5) {
    //   selectedAreas.push(area.props.id)
    // }
  }

  // Removes Area IDs from the selectedAreas state array
  removeArea(area) {

  }

  // Handles text field inputs
  handleTextInput(event) {

  }

  // // Page Content

  // Renders the selected Region ("country") name above the rendered Districts ("states")
  currentRegionName() {
    var currentRegionID = this.state.region
    return this.state.regions.find(function(region) {
      return region.id === currentRegionID
    }).name
  }

  // Renders the selected District name above the rendered Areas ("cities")
  currentDistrictName() {
    var currentDistrictID = this.state.district
    return this.state.districts.find(function(district) {
      return district.id === currentDistrictID
    }).name
  }

  // // Child Groups

  // Renders child Buttons for each Object in `this.state.regions` Array
  renderRegions() {
    return this.state.regions.map((region) => {
      var isSelected = region.id === this.state.region;
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

  // Renders child Buttons for each Associated Object in `this.state.districts` Array
  renderDistricts() {
    return this.state.districts.map((district) => {
      if (district.region_id === this.state.region) {
        var isSelected = district.id === this.state.district;
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

  // Renders child Buttons for each Associated Object in Areas `this.state.areas` Array
  renderAreas() {
    return this.state.areas.map((area) => {
      if (area.district_id === this.state.district) {
        var isSelected = this.state.selectedAreas.contains(area.id)
        return <Button 
                 key={area.id}
                 type='area'
                 id={area.id}
                 name={area.name}
                 select={this.addArea.bind(this)}
                 isSelected={isSelected}
               />
      }
    })
  }

  // // JSX

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
              I'm gonna put the submit button here, and it will disappear while loading
              </p>
              <p>
              Underneath this I will populate the results underneath each community label
              </p>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
