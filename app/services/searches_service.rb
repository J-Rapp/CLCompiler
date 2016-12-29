require 'craigslist'

class SearchesService
  def call
    parse_and_persist_ready_searches
  end

  private

  def parse_and_persist_ready_searches
    searches = Search.all
    searches.each do |search|
      listings = search.refresh_interval == 'daily' ? check(search) : execute(search)
      # ListingsService.new.persist(listings, search)
    end
  end

  def check(search)
    execute(search) if search.updated_at <= 1.day.ago # "before" 1 day ago
    # TODO: make certain that .updated_at will update with each daily rake
    # even if nothing new is returned from listings.
  end

  def execute(search)
    subdomains = search.areas.map(&:subdomain)
    params = {
      includes: search.includes,
      excludes: search.excludes,
      min_price: search.min_price,
      max_price: search.max_price
    }
    listings = Craigslist.search(subdomains, params)
  end
end
