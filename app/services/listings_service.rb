class ListingsService
  def persist(craigslist_results, search_id)
    create_or_update_listings(craigslist_results, search_id)
  end

  private

  def create_or_update_listings(craigslist_results, search_id)
    craigslist_results.each do |result|
      puts result
      # Listing.find_or_initialize_by(result)
    end
  end
end
