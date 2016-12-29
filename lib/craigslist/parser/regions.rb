module Craigslist
  module Parser
    class Regions
      def parse(nokogiri_subdomain_page)
        all_regions(nokogiri_subdomain_page)
      end

      private

      def all_regions(nokogiri_subdomain_page)
        nokogiri_subdomain_page.xpath('//h1')
      end
    end
  end
end
