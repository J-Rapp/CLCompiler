class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: props.results
    }
  }

  renderResults() {
    return this.state.results.map((result) => {
      return <ContentBox key={result.url}>
               <Result 
                 key={result.url}
                 url={result.url}
                 title={result.title} 
                 price={result.price} />
             </ContentBox>
    })
  }

  // Animates results the first time they appear
  componentDidMount() {
    const searchHeight = $('#search-animation').height()
    $('#app').animate({
      scrollTop: searchHeight
    }, 1000)
  }

  render() {
    return (
      <div id='results'>
        <div className='container'>
          <hr />
        </div>
        { this.renderResults() }
      </div>
    )
  }
}