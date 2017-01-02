require 'craigslist'

class SearchesService
  def call(opts = {})
    opts[:search] ? execute(opts[:search]) : execute_all_ready_searches
  end

  private

  def execute_all_ready_searches
    searches = Search.all
    searches.each do |search|
      search.refresh_interval == 'daily' ? check(search) : execute(search)
      email_new_results(search) if search.results.deliverable.any?
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
    craigslist_results = Craigslist.search(subdomains, params)
    persist(craigslist_results, search)
  end

  def persist(craigslist_results, search)
    ResultsService.new.persist(craigslist_results, search.id)
  end

  def email_new_results(search)
    SearchMailer.new_results(search).deliver_now
    search.results.deliverable.each do |result|
      result.update_attributes!(delivered: true)
    end
  end
end
