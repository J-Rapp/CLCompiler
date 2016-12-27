module CraigslistService
  class SearchesService
    def send
      send_all_ready_searches
    end

    private

    def send_all_ready_searches
      searches = Search.all
      searches.each do |search|
        if search.refresh_interval == 'daily'
          check_if_ready(search)
        else
          execute(search)
        end
      end
    end

    def check_if_ready(search)
      # Check if date updated was prior to 24 hours ago
      execute(search) if search.updated_at <= 1.day.ago
      # TODO: make certain that .updated_at will update with each daily rake
      # even if nothing new is returned from listings.
    end

    def execute(search)
      SearchService.new.call(search)
    end
  end
end
