module ParsingService
  class ParseCountries
    def self.call(nokogiri_object)
      parse_countries(nokogiri_object)
    end

    private_class_method def self.parse_countries(nokogiri_object)
      nokogiri_object.xpath('//h1')
    end
  end
end
