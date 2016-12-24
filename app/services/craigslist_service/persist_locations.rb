require 'rest-client'
require 'nokogiri'

module CraigslistService
  class PersistLocations
    after_initialize :trigger

    LIST_OF_CL_SUBDOMAINS_URL = 'http://www.craigslist.org/about/sites'.freeze

    def initialize
      @nokogiri_object = process_response(LIST_OF_CL_SUBDOMAINS_URL)
    end

    private

    def process_response(url)
      response = RestClient.get(url)
      clean_html = ParsingService::HTMLCleaner.clean(response.body)
      Nokogiri::HTML(clean_html)
    end

    def trigger
      parse_and_persist_countries
    end

    def parse_and_persist_countries
      country_nodes = ParsingService::FindAllCountries.new(@nokogiri_object)
                                                      .country_nodes
      country_nodes.each do |country_node|
        country = Country.first_or_create!(name: country_node.text)
        country_id = country.id
        parse_and_persist_states(country_node, country_id)
      end
    end

    def parse_and_persist_states(country_node, country_id)
      state_nodes = ParsingService::FindChildrenStates.new(country_node)
                                                      .state_nodes
      state_nodes.each do |state_node|
        state = State.first_or_initialize(name: state_node.text)
        state.country_id = country_id
        state.save!
        state_id = state.id
        parse_and_persist_cities(state_node, state_id)
      end
    end

    def parse_and_persist_cities(state_node, state_id)
      city_pairs = ParsingService::FindChildrenCities.new(state_node)
                                                     .city_pairs
      city_pairs.each do |city_values|
        city = City.first_or_initialize(name: city_values[:name])
        city.url = city_values[:url]
        city.state_id = state_id
        city.save!
        p city.id, city.name, city.url
      end
    end
  end
end
