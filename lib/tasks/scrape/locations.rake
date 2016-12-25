desc 'Scrapes all the regions, districts, and areas from Craigslist'
namespace :scrape do
  task locations: :environment do
    locations = CraigslistService::Locations.new
    locations.scrape_and_parse
    locations.persist
  end
end
