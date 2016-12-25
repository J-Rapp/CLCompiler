module ParsingService
  class FindChildrenAreas
    def call(district_node)
      parse_areas(district_node)
    end

    private

    def parse_areas(district_node)
      # Group of areas under a district header
      collection_of_areas_node = district_node.next_element
      areas = []
      # Each area's header title and link
      collection_of_areas_node.xpath('.//li').each do |list_node|
        areas << {
          name: list_node.text,
          url: list_node.xpath('.//a/@href').first.value
        }
      end
      areas
    end
  end
end