module ParsingService
  class FindAllCountries
    attr_reader :country_nodes

    def initialize(nokogiri_object)
      @country_nodes = parse_countries(nokogiri_object)
    end

    private

    def parse_countries(nokogiri_object)
      nokogiri_object.xpath('//h1')
    end
  end
end
