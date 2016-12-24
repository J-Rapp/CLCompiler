module ParsingService
  class FindChildrenStates
    attr_reader :state_nodes

    def initialize(country_node)
      @state_nodes = parse_states(country_node)
    end

    private

    def parse_states(country_node)
      # A div holding them
      collection_of_states_node = country_node.next_element
      # The individual headers within
      collection_of_states_node.xpath('.//h4')
    end
  end
end