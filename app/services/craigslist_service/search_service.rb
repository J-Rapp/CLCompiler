module CraigslistService
  class SearchService
    def call(search)
      send_request_for_each_search_area(search)
    end

    private

    def send_request_for_each_search_area(search)
      craigslist_urls = URLAssembler.new.generate_urls(search)
      puts craigslist_urls
      # craigslist_urls.each do |craigslist_url|
      #   response = RestClient.get(craigslist_url)
      #   p response
      # end
    end
  end
end
