require 'rest-client'
require 'nokogiri'

module CraigslistParser
  class AllLocations
    def parse
      process_response
    end

    private

    LIST_OF_CL_SUBDOMAINS_URL = 'http://www.craigslist.org/about/sites'.freeze

    def process_response
      response = RestClient.get(LIST_OF_CL_SUBDOMAINS_URL)
      clean_html = CraigslistParser::HTMLCleaner.new.clean(response.body)
      nokogori_object = Nokogiri::HTML(clean_html)
      locations = {}
      parse_regions(nokogori_object, locations)
      locations
    end

    def parse_regions(nokogiri_object, locations)
      region_nodes = CraigslistParser::Regions.new.parse(nokogiri_object)
      region_nodes.each do |region_node|
        locations[region_node.text] = {}
        parse_districts(region_node, locations)
      end
    end

    def parse_districts(region_node, locations)
      district_nodes = CraigslistParser::Districts.new.parse(region_node)
      district_nodes.each do |district_node|
        locations[region_node.text][district_node.text] = {}
        parse_areas(region_node, district_node, locations)
      end
    end

    def parse_areas(region_node, district_node, locations)
      areas = CraigslistParser::Areas.new.parse(district_node)
      areas.each do |area|
        locations[region_node.text][district_node.text][area[:name]] =
          area[:url]
      end
    end
  end
end
