module Craigslist
  class Search
    # Returns a nested hash of all listings
    def perform(subdomains, params)
      request_and_parse_each_search_area(subdomains, params)
    end

    # TODO: Give this an instance variable of listings
    # and methods to return specific listings and values

    private

    def request_and_parse_each_search_area(subdomains, params)
      craigslist_urls = Search::URL.new.assemble(subdomains, params)
      process_response(craigslist_urls[0])
      # craigslist_urls.each do |craigslist_url|
      #   process_response(craigslist_url)
      # end
    end

    def process_response(craigslist_url)
      response = RestClient.get(craigslist_url)
      clean_html = Parser::HTMLCleaner.new.clean(response.body)
      nokogiri_object = Nokogiri::HTML(clean_html)
      Parser::Listings.new.parse(nokogiri_object)
    end
  end
end
