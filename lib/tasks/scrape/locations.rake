desc 'Scrapes all the regions, districts, and areas from Craigslist'
namespace :scrape do
  task locations: :environment do
    locations = CraigslistParser::AllLocations.new.parse
    CraigslistService::Locations.new.persist(locations)
  end
end
