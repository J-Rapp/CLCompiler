module Craigslist
  class Search
    class URL
      def assemble_urls(subdomains, params)
        build_urls(subdomains, params)
      end

      private

      def build_urls(subdomains, params)
        urls = []
        search.areas.each do |area|
          urls << protocol_and_subdomain(area) + path_and_parameters(search)
        end
        urls
      end

      def protocol_and_subdomain(area)
        'http://' + subdomain + 
      end

      def path_and_parameters(search)
        # TODO: add ability to alter search directory path
        # (for sale, services, housing, etc)
        'search/sss?' +
          build_query(search) +
          min_price(search) +
          max_price(search) +
          sort_by
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
        search.min_price ? ('&min_price=' + search.min_price) : ''
      end

      def max_price(search)
        search.max_price ? ('&max_price=' + search.max_price) : ''
      end

      def sort_by
        '&sort=date'
      end
    end
  end
end
