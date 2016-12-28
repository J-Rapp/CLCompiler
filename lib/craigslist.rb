module Craigslist
  def self.locations
    Craigslist::Locations.new.parse
  end

  def self.search
  end
end
