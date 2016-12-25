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
      parse_regions(nokogori_object)
    end

    def parse_regions(nokogiri_object)
      region_nodes = ParsingService::FindAllRegions.new.call(nokogiri_object)
      region_nodes.each do |region_node|
        @locations[region_node.text] = {}
        parse_districts(region_node)
      end
    end

    def parse_districts(region_node)
      district_nodes = ParsingService::FindChildrenDistricts.new.call(region_node)
      district_nodes.each do |district_node|
        @locations[region_node.text][district_node.text] = {}
        parse_areas(region_node, district_node)
      end
    end

    def parse_areas(region_node, district_node)
      areas = ParsingService::FindChildrenAreas.new.call(district_node)
      areas.each do |area|
        @locations[region_node.text][district_node.text][area[:name]] = area[:url]
      end
    end

    def persist_locations
      @locations.each do |region_name, districts|
        region = Region.find_or_create_by!(
          name: region_name
        )
        persist_districts(districts, region.id)
      end
    end

    def persist_districts(districts, region_id)
      districts.each do |district_name, areas|
        district = District.find_or_initialize_by(
          name: district_name
        )
        district.region_id = region_id
        district.save!
        persist_areas(areas, district.id)
      end
    end

    def persist_areas(areas, district_id)
      areas.each do |area_name, url|
        area = Area.find_or_initialize_by(
          name: area_name
        )
        area.district_id = district_id
        area.url = url
        area.save!
      end
    end
  end
end
