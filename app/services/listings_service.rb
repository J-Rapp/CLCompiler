class ListingsService
  def persist(craigslist_results, search_id)
    create_or_update_listings(craigslist_results, search_id)
  end

  private

  def create_or_update_listings(craigslist_results, search_id)
    craigslist_results.each do |key, value|
      puts "url - #{key}"
      puts "details - #{value}"
    end
  end
end
