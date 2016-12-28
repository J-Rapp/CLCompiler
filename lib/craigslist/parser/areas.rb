module Craigslist
  module Parser
    class Areas
      def parse(district_node)
        child_areas(district_node)
      end

      private

      def child_areas(district_node)
        # Group of areas under a district
        areas_node = district_node.next_element
        areas = []
        # Each area's title and link
        areas_node.xpath('.//li').each do |list_node|
          areas << {
            name: list_node.text,
            url: list_node.xpath('.//a/@href').first.value
          }
        end
        areas
      end
    end
  end
end