require 'craigslist'

class SearchesService
  def call(opts = {})
    parse_and_persist_ready_searches(opts)
  end

  private

  def parse_and_persist_ready_searches(opts = {})
    searches = if opts[:user_id]
                 Search.all.where(user_id: opts[:user_id])
               else
                 Search.all
               end
    searches.each do |search|
      craigslist_results = search.refresh_interval == 'daily' ? check(search) : execute(search)
      ResultsService.new.persist(craigslist_results, search.id)
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
    Craigslist.search(subdomains, params)
  end

  def email_new_results(search)
    SearchMailer.new_results(search).deliver_now
    search.results.deliverable.each do |result|
      result.update_attributes!(delivered: true)
    end
  end
end
