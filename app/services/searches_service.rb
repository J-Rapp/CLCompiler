require 'craigslist'

class SearchesService
  def send
    send_all_ready_searches
  end

  private

  def send_all_ready_searches
    searches = Search.all
    searches.each do |search|
      if search.refresh_interval == 'daily'
        check_if_ready(search)
      else
        execute(search)
      end
    end
  end

  def check_if_ready(search)
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
    Craigslist.search(subdomains, params)
  end
end
