module ParsingService
  class FindAllRegions
    def call(nokogiri_object)
      parse_regions(nokogiri_object)
    end

    private

    def parse_regions(nokogiri_object)
      nokogiri_object.xpath('//h1')
    end
  end
end
