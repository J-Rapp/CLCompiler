require 'nokogiri'

module CraigslistService
  class ScrapeLocations
    LIST_OF_CL_SUBDOMAINS_URL = 'http://http://www.craigslist.org/about/sites'.freeze

    def self.retrieve
      parse_and_persist(LIST_OF_CL_SUBDOMAINS_URL)
    end

    private

    def self.parse_and_persist(url)
      p url
    end
  end
end
