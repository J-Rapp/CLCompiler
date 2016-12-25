module ParsingService
  class FindChildrenDistricts
    def call(region_node)
      parse_districts(region_node)
    end

    private

    def parse_districts(region_node)
      # Group of districts under a region header
      collection_of_districts_node = region_node.next_element
      # The individual district headers within
      collection_of_districts_node.xpath('.//h4')
    end
  end
end