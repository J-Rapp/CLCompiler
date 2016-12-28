module Craigslist
  class Search
    def perform(subdomains, query_opts = {})
      send_request_for_each_search_area(subdomains, query_opts)
    end

    private

    def send_request_for_each_search_area(search)
      craigslist_urls = URL.new.assemble_urls(search)
      # craigslist_urls.each do |craigslist_url|
      #   response = RestClient.get(craigslist_url)
      # end
    end
  end
end
