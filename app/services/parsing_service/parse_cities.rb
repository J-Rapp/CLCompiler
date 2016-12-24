module ParsingService
  class ParseCities
    def self.call(state_node)
      parse_cities(state_node)
    end

    private_class_method def self.parse_cities(state_node)
      collection_of_cities_node = state_node.next_element
      cities = []
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