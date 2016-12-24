module ParsingService
  class ParseStates
    def self.call(country_node)
      parse_states(country_node)
    end

    private_class_method def self.parse_states(country_node)
      collection_of_states_node = country_node.next_element
      collection_of_states_node.xpath('.//h4')
    end
  end
end