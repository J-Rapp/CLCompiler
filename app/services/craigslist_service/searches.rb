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
        else
          search.send_all_area_queries
        end
    end
  end
end
