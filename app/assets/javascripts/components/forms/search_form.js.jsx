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
      resultsIn: false
    }
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
    return selectedAreas.map((area) => {
      return area.subdomain
    })
  }
  handleTextInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmitForm(event) {
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
        subdomains: params.subdomains,
        search: {
          includes: params.includesTerms,
          excludes: params.excludesTerms,
          min_price: params.minPrice,
          max_price: params.maxPrice
        }
      }
    }).done(function(data){
      searchForm.setState({
        fetchingResults: false,
        resultsIn: true,
        craigslistResults: data
      })
      $('html, body').animate({
        scrollTop: $('#start-results').offset().top + 'px'
      }, 1500)
    }).fail(function(data){
      searchForm.setState({
        // TODO: populate errors
        errors: null
      })
    })
  }
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
  render(){
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
}