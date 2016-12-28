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
      nokogori_object = Nokogiri::HTML(clean_html)
      locations = {}
      parse_regions(nokogori_object, locations)
      locations
    end

    def parse_regions(nokogiri_object, locations)
      region_nodes = Parser::Regions.new.parse(nokogiri_object)
      region_nodes.each do |region_node|
        locations[region_node.text] = {}
        parse_districts(region_node, locations)
      end
    end

    def parse_districts(region_node, locations)
      district_nodes = Parser::Districts.new.parse(region_node)
      district_nodes.each do |district_node|
        locations[region_node.text][district_node.text] = {}
        parse_areas(region_node, district_node, locations)
      end
    end

    def parse_areas(region_node, district_node, locations)
      areas = Parser::Areas.new.parse(district_node)
      areas.each do |area|
        locations[region_node.text][district_node.text][area[:name]] =
          area[:subdomain]
      end
    end
  end
end
