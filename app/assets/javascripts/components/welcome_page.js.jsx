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
      selectedAreas: []
    };
  }
  getToken() {
    var metas = document.getElementsByTagName('meta');
    for (var i=0; i<metas.length; i++) {
      if (metas[i].getAttribute('name') === 'csrf-token') {
        return metas[i].getAttribute('content');
      }
    }
  }
  _changePlace(location) {
    this.setState({ 
      [location.props.type]: location.props.id
    })
  }
  renderRegions() {
    return this.state.regions.map((region) => {
      var isSelected = region.id === this.state.region;
      return <Button key={region.id} type='region' id={region.id} name={region.name} _changePlace={this._changePlace.bind(this)} isSelected={isSelected} />;
    })
  }
  renderDistricts() {
    return this.state.districts.map((district) => {
      if (district.region_id === this.state.region) {
        var isSelected = district.id === this.state.district;
        return <Button key={district.id} type='district' id={district.id} name={district.name} _changePlace={this._changePlace.bind(this)} isSelected={isSelected} />
      }
    })
  }
  renderAreas() {
    return this.state.areas.map((area) => {
      if (area.district_id === this.state.district) {
        var isSelected = area.id === this.state.area;
        return <Button key={area.id} type='area' id={area.id} name={area.name} _changePlace={this._changePlace.bind(this)} isSelected={isSelected} />
      }
    })
  }
  render() {
    return (
      <form>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <p>
              I'm gonna put a search fields here for terms and pricing
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
              Select Region:
              </p>
              { this.renderRegions() }
            </div>
          </div>
        </div>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <p>
              Select District:
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
              Select Areas (up to 5):
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
