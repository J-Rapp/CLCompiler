module Craigslist
  module Parser
    class Listings
      def parse(nokogiri_results_page)
        parse_all_listings(nokogiri_results_page)
      end

      private

      def parse_all_listings(nokogiri_results_page)
        p 'hey'
      end
    end
  end
end
