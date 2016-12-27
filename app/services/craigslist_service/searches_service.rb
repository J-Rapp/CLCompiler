module CraigslistService
  class SearchesService
    def send
      send_all_searches
    end

    private

    def send_all_ready_searches
      searches = Search.all
      searches.each do |search|
        if search.daily?
          check_if_ready(search)
        else
          execute_search(search)
        end
    end

    def check_if_ready(search)
      execute_search(search) if (search.updated_at >= 1.day.ago)
    end

    def execute_search
      SearchService.new.call
    end
  end
end
