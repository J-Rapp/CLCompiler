class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: this.getToken(),
      selectedAreas: props.selectedAreas,
      includesTerms: '',
      excludesTerms: '',
      minPrice: '',
      maxPrice: '',
      fetchingResults: false,
      errors: false
    }
    this.handleDeselect = this.handleDeselect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getSubdomains = this.getSubdomains.bind(this)
  }

  getToken() {
    let metas = document.getElementsByTagName('meta');
    for (let i=0; i<metas.length; i++) {
      if (metas[i].getAttribute('name') === 'csrf-token') {
        return metas[i].getAttribute('content');
      }
    }
  }

  getSubdomains() {
    return this.state.selectedAreas.map((area) => {
      return area.subdomain
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDeselect(button) {
    const selectedArea = button.state.object
    let stateArray = this.state.selectedAreas
    const i = stateArray.indexOf(selectedArea)

    stateArray.splice(i, 1)

    this.setState({
      selectedAreas: stateArray
    }, function() {
      // Lift selectedAreas up to WelcomePage
      this.props.selectArea(button, stateArray)
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const searchForm = this
    const params = this.state
    searchForm.setState({
      fetchingResults: true
    })
    $.ajax({
      type: 'POST',
      url: 'search',
      data: {
        authenticity_token: params.token,
        subdomains: searchForm.getSubdomains(),
        search: {
          includes: params.includesTerms,
          excludes: params.excludesTerms,
          min_price: params.minPrice,
          max_price: params.maxPrice
        }
      }
    }).done(function(data){
      searchForm.setState({
        errors: false,
        fetchingResults: false
      }, function() {
        // Lift results up to WelcomePage
        this.props.handleResults(data)
      })
    }).fail(function(data){
      searchForm.setState({
        // TODO: populate actual errors
        errors: true,
        fetchingResults: false
      })
    })
  }

  // Called when the WelcomePage re-renders and passes props down
  componentWillReceiveProps(props) {
    this.setState({
      selectedAreas: props.selectedAreas 
    });
  }

  renderSelectedAreas() {
    return this.state.selectedAreas.map((area) => {
        return <Button 
                 key={area.id}
                 type='area'
                 object={area}
                 handleSelect={this.handleDeselect}
                 isSelected='true'
                 getsX='true'
               />
    })
  }

  render(){
    return (
      <form onSubmit={ this.handleSubmit }>
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
              { this.renderSelectedAreas() }
            </div>
          </div>
        </div>

        <div className='row text-center'>
          <div className='col-xs-12'>
            <input name='includesTerms' type='text' onChange={ this.handleChange } placeholder='search for...'></input>
          </div>
        </div>

        <div className='row text-center'>
          <div className='col-xs-12'>
            <input name='excludesTerms' type='text' onChange={ this.handleChange } placeholder='skip if it includes...'></input>
          </div>
        </div>

        <div className='row text-center'>
          <div className='col-xs-6'>
            <input name='minPrice' type='text' onChange={ this.handleChange } placeholder='min price'></input>
          </div>
          <div className='col-xs-6'>
            <input name='maxPrice' type='text' onChange={ this.handleChange } placeholder='max price'></input>
          </div>
        </div>

        <div className='row text-center'>
          <div className='col-xs-12'>
            { this.state.fetchingResults ? 'Fetching results...' : <input type='submit' className='key-btn'></input> }
            { this.state.errors ? <p><br></br>An error occurred</p> : null }
          </div>
        </div>
      </form>
    )
  }
}