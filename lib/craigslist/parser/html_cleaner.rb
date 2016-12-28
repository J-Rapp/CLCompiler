module Craigslist
  module Parser
    class HTMLCleaner
      def clean(html_string)
        remove_any_white_space_between_tags(
          condense_whitespace(html_string)
        ).strip
      end

      private

      def remove_any_white_space_between_tags(html_string)
        html_string.gsub(/(?<=>)\s+(?=<)/, '')
      end

      def condense_whitespace(html_string)
        html_string.gsub(/\s+/, ' ')
      end
    end
  end
end
