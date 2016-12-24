desc 'Scrapes all the countries, states, and cities from Craigslist'
namespace :scrape do
  task locations: :environment do
    locations = CraigslistService::Locations.new
    locations.scrape_and_parse
    locations.persist
  end
end
