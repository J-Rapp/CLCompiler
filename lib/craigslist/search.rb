module Craigslist
  class Search
    def perform(subdomains, params)
      send_request_for_each_search_area(subdomains, params)
    end

    private

    def send_request_for_each_search_area(subdomains, params)
      craigslist_urls = Search::URL.new.assemble_urls(subdomains, params)
      # craigslist_urls.each do |craigslist_url|
      #   response = RestClient.get(craigslist_url)
      # end
    end
  end
end
