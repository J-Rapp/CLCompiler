module Craigslist
  def self.locations
    Craigslist::Locations.new.parse
  end

  def self.search(subdomains, params)
    Craigslist::Search.new.perform(subdomains, params)
  end
end
