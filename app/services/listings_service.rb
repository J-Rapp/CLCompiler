class ListingsService
  def persist(craigslist_results)
    create_or_update_listings(craigslist_results)
  end

  private

  def create_or_update_listings(craigslist_results)
    craigslist_results.map do |url, details|
      listing = Listing.find_or_initialize_by(url: url)
      listing.update_attributes!(title: details[:title], price: details[:price])
      listing
    end
  end
end
