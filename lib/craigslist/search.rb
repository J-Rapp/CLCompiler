module Craigslist
  class Search
    # Returns a nested hash of all results
    def perform(subdomains, params)
      request_and_parse_each_search_area(subdomains, params)
    end

    private

    def request_and_parse_each_search_area(subdomains, params)
      craigslist_urls = Search::URL.new.assemble(subdomains, params)
      all_results = {}
      craigslist_urls.each do |craigslist_url|
        subdomain_results = process_response(craigslist_url)
        all_results = all_results.merge(subdomain_results)
      end
      all_results
    end

    def process_response(craigslist_url)
      response = RestClient.get(craigslist_url)
      clean_html = Parser::HTMLCleaner.new.clean(response.body)
      nokogiri_results_page = Nokogiri::HTML(clean_html)
      Parser::Results.new.parse(nokogiri_results_page, craigslist_url)
    end
  end
end
