desc 'Scrapes all the countries, states, and cities from Craigslist'
namespace :scrape do
  task locations: :environment do
    service = CraigslistService::Locations.new
    service.scrape_and_parse
    CraigslistService::PersistLocations.new.call(service.locations)
  end
end
