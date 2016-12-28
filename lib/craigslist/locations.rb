require 'rest-client'
require 'nokogiri'

module Craigslist
  class Locations
    # Returns a nested hash of all locations
    def parse
      process_response
    end

    private

    LIST_OF_CL_SUBDOMAINS_URL = 'http://www.craigslist.org/about/sites'.freeze

    def process_response
      response = RestClient.get(LIST_OF_CL_SUBDOMAINS_URL)
      clean_html = Parser::HTMLCleaner.new.clean(response.body)
      nokogori_subdomain_page = Nokogiri::HTML(clean_html)
      locations = {}
      parse_regions_first(nokogori_subdomain_page, locations)
      locations
    end

    def parse_regions_first(nokogiri_subdomain_page, locations)
      region_nodes = Parser::Regions.new.parse(nokogiri_subdomain_page)
      region_nodes.each do |region_node|
        locations[region_node.text] = {}
        parse_districts_next(region_node, locations)
      end
    end

    def parse_districts_next(region_node, locations)
      district_nodes = Parser::Districts.new.parse(region_node)
      district_nodes.each do |district_node|
        locations[region_node.text][district_node.text] = {}
        parse_areas_last(region_node, district_node, locations)
      end
    end

    def parse_areas_last(region_node, district_node, locations)
      areas = Parser::Areas.new.parse(district_node)
      areas.each do |area|
        locations[region_node.text][district_node.text][area[:name]] =
          area[:subdomain]
      end
    end
  end
end
