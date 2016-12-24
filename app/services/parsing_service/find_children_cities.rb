module ParsingService
  class FindChildrenCities
    attr_reader :city_pairs

    def initialize(state_node)
      @city_pairs = parse_cities(state_node)
    end

    private

    def parse_cities(state_node)
      # A group of cities
      collection_of_cities_node = state_node.next_element
      cities = []
      # Each city's link and title
      collection_of_cities_node.xpath('.//li').each do |list_node|
        cities << {
          url: list_node.xpath('.//a/@href').first.value,
          name: list_node.text
        }
      end
      cities
    end
  end
end