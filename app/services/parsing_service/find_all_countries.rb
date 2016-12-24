module ParsingService
  class FindAllCountries
    def call(nokogiri_object)
      parse_countries(nokogiri_object)
    end

    private

    def parse_countries(nokogiri_object)
      nokogiri_object.xpath('//h1')
    end
  end
end
