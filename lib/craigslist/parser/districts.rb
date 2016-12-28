module Craigslist
  module Parser
    class Districts
      def parse(region_node)
        child_districts(region_node)
      end

      private

      def child_districts(region_node)
        # Group of districts under a region
        districts_node = region_node.next_element
        # The individual districts within
        districts_node.xpath('.//h4')
      end
    end
  end
end
