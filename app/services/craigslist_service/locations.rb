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

    def persist
      persist_locations
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
      country_nodes = ParsingService::FindAllCountries.new.call(nokogiri_object)
      country_nodes.each do |country_node|
        @locations[country_node.text] = {}
        parse_states(country_node)
      end
    end

    def parse_states(country_node)
      state_nodes = ParsingService::FindChildrenStates.new.call(country_node)
      state_nodes.each do |state_node|
        @locations[country_node.text][state_node.text] = {}
        parse_cities(country_node, state_node)
      end
    end

    def parse_cities(country_node, state_node)
      cities = ParsingService::FindChildrenCities.new.call(state_node)
      cities.each do |city|
        @locations[country_node.text][state_node.text][city[:name]] = city[:url]
      end
    end

    def persist_locations
      @locations.each do |country_name, states|
        country = Country.find_or_create_by!(
          name: country_name
        )
        persist_states(states, country.id)
      end
    end

    def persist_states(states, country_id)
      states.each do |state_name, cities|
        state = State.find_or_initialize_by(
          name: state_name
        )
        state.country_id = country_id
        state.save!
        persist_cities(cities, state.id)
      end
    end

    def persist_cities(cities, state_id)
      cities.each do |city_name, url|
        city = City.find_or_initialize_by(
          name: city_name
        )
        city.state_id = state_id
        city.url = url
        city.save!
      end
    end
  end
end
