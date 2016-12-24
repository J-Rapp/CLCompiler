require 'rest-client'
require 'nokogiri'

module CraigslistService
  class PersistLocations
    LIST_OF_CL_SUBDOMAINS_URL = 'http://www.craigslist.org/about/sites'.freeze

    def self.commence
      process_response(LIST_OF_CL_SUBDOMAINS_URL)
    end

    private_class_method def self.process_response(url)
      response = RestClient.get(url)
      clean_html = ParsingService::HTMLCleaner.clean(response.body)
      nokogiri_object = Nokogiri::HTML(clean_html)
      parse_and_persist_countries(nokogiri_object)
    end

    private_class_method def self.parse_and_persist_countries(nokogiri_object)
      country_nodes = ParsingService::ParseCountries.call(nokogiri_object)
      country_nodes.each do |country_node|
        country = Country.first_or_create!(
          name: country_node.text
        )
        country_id = country.id
        parse_and_persist_states(country_node, country_id)
      end
    end

    private_class_method def self.parse_and_persist_states(country_node, country_id)
      state_nodes = ParsingService::ParseStates.call(country_node)
      state_nodes.each do |state_node|
        state = State.first_or_initialize(
          name: state_node.text
        )
        state.country_id = country_id
        state.save!
        state_id = state.id
        parse_and_persist_cities(state_node, state_id)
      end
    end

    private_class_method def self.parse_and_persist_cities(state_node, state_id)
      cities = ParsingService::ParseCities.call(state_node)
      cities.each do |city_values|
        city = City.first_or_initialize(
          name: city_values[:name]
        )
        city.url = city_values[:url]
        city.state_id = state_id
        city.save!
        p city.id, city.name, city.url
      end
    end
  end
end
