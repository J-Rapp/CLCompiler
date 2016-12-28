module Craigslist
  module Parser
    class Regions
      def parse(nokogiri_object)
        all_regions(nokogiri_object)
      end

      private

      def all_regions(nokogiri_object)
        nokogiri_object.xpath('//h1')
      end
    end
  end
end
