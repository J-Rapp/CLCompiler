require 'rest-client'
require 'nokogiri'

module CraigslistService
  class Locations
    attr_reader :locations

    def initialize
      @locations = {}
    end

    def scrape_and_parse
      process_response
    end

    private

    LIST_OF_CL_SUBDOMAINS_URL = 'http://www.craigslist.org/about/sites'.freeze

    def process_response
      response = RestClient.get(LIST_OF_CL_SUBDOMAINS_URL)
      clean_html = ParsingService::HTMLCleaner.clean(response.body)
      nokogori_object = Nokogiri::HTML(clean_html)
      parse_countries(nokogori_object)
    end

    def parse_countries(nokogiri_object)
      country_nodes = ParsingService::FindAllCountries.new(nokogiri_object)
                                                      .country_nodes
      country_nodes.each do |country_node|
        @locations[country_node.text] = {}
        parse_states(country_node)
      end
    end

    def parse_states(country_node)
      state_nodes = ParsingService::FindChildrenStates.new(country_node)
                                                      .state_nodes
      state_nodes.each do |state_node|
        @locations[country_node.text][state_node.text] = {}
        parse_cities(country_node, state_node)
      end
    end

    def parse_cities(country_node, state_node)
      cities = ParsingService::FindChildrenCities.new(state_node)
                                                 .cities
      cities.each do |city|
        @locations[country_node.text][state_node.text][city[:name]] = city[:url]
      end
    end
  end
end
