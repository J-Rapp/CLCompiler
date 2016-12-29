module Craigslist
  class Search
    # Returns a nested hash of all listings
    def perform(subdomains, params)
      request_and_parse_each_search_area(subdomains, params)
    end

    private

    def request_and_parse_each_search_area(subdomains, params)
      craigslist_urls = Search::URL.new.assemble(subdomains, params)
      all_listings = {}
      craigslist_urls.each do |craigslist_url|
        subdomain_results = process_response(craigslist_url)
        all_listings = all_listings.merge(subdomain_results)
      end
      all_listings
    end

    def process_response(craigslist_url)
      response = RestClient.get(craigslist_url)
      clean_html = Parser::HTMLCleaner.new.clean(response.body)
      nokogiri_results_page = Nokogiri::HTML(clean_html)
      Parser::Listings.new.parse(nokogiri_results_page, craigslist_url)
    end
  end
end
