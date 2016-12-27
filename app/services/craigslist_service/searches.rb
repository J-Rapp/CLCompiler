module CraigslistService
  class Searches
    def send
      send_all_searches
    end
    private

    def send_all_searches
      searches = Search.all
      searches.each do |search|
        if search.daily?
          check_if_ready(search)
        else
          execute_search(search)
        end
    end

    def check_if_ready(search)
      execute_search(search) if # (logic for 24 hours passing)
    end

    def execute_search
      craigslist_urls = URLAssembler.new.generate_url(search)
      craigslist_urls.each do |craigslist_url|
        response = RestClient.get(search_url)
      end
    end
  end
end
