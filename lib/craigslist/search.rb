module Craigslist
  class Search
    def perform(subdomains, params)
      send_request_for_each_search_area(subdomains, params)
    end

    private

    def send_request_for_each_search_area(subdomains, params)
      craigslist_urls = Search::URL.new.assemble(subdomains, params)
      process_response(craigslist_urls[0])
      # craigslist_urls.each do |craigslist_url|
      #   process_response(craigslist_url)
      # end
    end

    def process_response
      response = RestClient.get(craigslist_url)
      p response.body
    end
  end
end
