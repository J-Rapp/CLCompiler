class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.getToken(),
      regions: props.regions,
      selectedRegion: 1,
      districts: props.districts,
      areas: props.areas
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
  renderRegions() {
    return this.state.regions.map((region) => {
      var isSelected = region.id === this.state.selectedRegion;
      return <Button key={region.id} id={region.id} name={region.name} changeRegion={this.changeRegion.bind(this)} isSelected={isSelected} />;
    })
  }
  changeRegion(region) {
    this.setState({
      selectedRegion: region.props.id
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
            </div>
          </div>
        </div>
        <div className='container content-box'>
          <div className='row text-center'>
            <div className='col-xs-12'>
              <p>
              Select Areas (up to 5):
              </p>
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
