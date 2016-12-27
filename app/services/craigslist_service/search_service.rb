module CraigslistService
  class SearchService
    def send
      
    end

    private

    def method_name
      craigslist_urls = URLAssembler.new.generate_url(search)
      craigslist_urls.each do |craigslist_url|
        response = RestClient.get(search_url)
      end
    end
  end
end