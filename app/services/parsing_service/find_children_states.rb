module ParsingService
  class FindChildrenStates
    def call(country_node)
      parse_states(country_node)
    end

    private

    def parse_states(country_node)
      # Group of states under a country header
      collection_of_states_node = country_node.next_element
      # The individual state headers within
      collection_of_states_node.xpath('.//h4')
    end
  end
end