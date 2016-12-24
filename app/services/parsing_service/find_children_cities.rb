module ParsingService
  class FindChildrenCities
    def call(state_node)
      parse_cities(state_node)
    end

    private

    def parse_cities(state_node)
      # Group of cities under a state header
      collection_of_cities_node = state_node.next_element
      cities = []
      # Each city's header title and link
      collection_of_cities_node.xpath('.//li').each do |list_node|
        cities << {
          name: list_node.text,
          url: list_node.xpath('.//a/@href').first.value
        }
      end
      cities
    end
  end
end