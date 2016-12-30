class ResultsService
  def persist(craigslist_results, search_id)
    create_or_update_results(craigslist_results, search_id)
  end

  private

  def create_or_update_results(craigslist_results, search_id)
    listings = ListingsService.new.persist(craigslist_results)
    listings.each do |listing|
      Result.find_or_create_by!(listing_id: listing.id, search_id: search_id)
    end
  end
end