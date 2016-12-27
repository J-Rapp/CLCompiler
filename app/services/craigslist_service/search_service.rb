module CraigslistService
  class SearchService
    def call
      send_request_for_each_search_area
    end

    private

    def send_request_for_each_search_area
      craigslist_urls = URLAssembler.new.generate_urls(search)
      craigslist_urls.each do |craigslist_url|
        response = RestClient.get(craigslist_url)
        p response
      end
    end
  end
end
