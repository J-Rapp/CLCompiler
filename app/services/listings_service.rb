class ListingsService
  def persist(craigslist_results)
    create_or_update_listings(craigslist_results)
  end

  private

  def create_or_update_listings(craigslist_results)
    craigslist_results.map do |result|
      listing = Listing.find_or_initialize_by(url: result[:url])
      listing.update_attributes!(title: result[:title], price: result[:price])
      listing
    end
  end
end
