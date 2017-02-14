module Craigslist
  class Search
    class URL
      def assemble(subdomains, params)
        build_urls(subdomains, params)
      end

      private

      def build_urls(subdomains, params)
        urls = []
        subdomains.each do |subdomain|
          urls << subdomain + path_and_parameters(params)
        end
        urls
      end

      def path_and_parameters(params)
        # TODO: add ability to alter search directory path
        # (for sale, services, housing, etc)
        'search/sss?' +
          build_query(params) +
          min_price(params) +
          max_price(params) +
          sort_by
      end

      def build_query(params)
        query = 'query=' + params[:includes]
        unless params[:excludes].empty?
          query = query + ' -"' + params[:excludes] + '"'
        end
        parameterize(query)
      end

      def parameterize(query)
        # TODO: Special character handling
        query.tr(' ', '+').downcase
      end

      def min_price(params)
        params[:min_price] ? ('&min_price=' + params[:min_price]) : ''
      end

      def max_price(params)
        params[:max_price] ? ('&max_price=' + params[:max_price]) : ''
      end

      def sort_by
        '&sort=date'
      end
    end
  end
end
