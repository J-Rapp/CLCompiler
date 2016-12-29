class ListingsService
  def persist(craigslist_results, search_id)
    create_or_update_listings(craigslist_results, search_id)
  end

  private

  def create_or_update_listings(craigslist_results, search_id)
    craigslist_results.each do |url, details|
      listing = Listing.find_or_initialize_by(url: url)
      listing.title = details[:title]
      listing.price = details[:price]
      listing.search_id = search_id
      listing.save!
    end
  end
end
