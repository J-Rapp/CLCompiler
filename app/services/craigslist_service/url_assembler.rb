module CraigslistService
  class URLAssembler
    def generate_urls(search)
      build_urls(search)
    end

    private

    def build_urls(search)
      urls = []
      search.areas.each do |area|
        urls << protocol_and_domain(area) + path_and_parameters(search)
      end
      urls
    end

    def protocol_and_domain(area)
      'http:' + area.url
    end

    def path_and_parameters(search)
      # TODO: add ability to alter search directory
      # (for sale, services, housing, etc)
      'search/sss?' +
        build_query(search) +
        min_price(search) +
        max_price(search)
    end

    def build_query(search)
      query = 'query=' + search.includes
      unless search.excludes.empty?
        query = query + ' -"' + search.excludes + '"'
      end
      parameterize(query)
    end

    def parameterize(query)
      # TODO: Special character handling
      query.tr(' ', '+').downcase
    end

    def min_price(search)
      '&min_price=' + search.price_min if search.price_min
    end

    def max_price(search)
      '&max_price=' + search.price_max if search.price_max
    end
  end
end
