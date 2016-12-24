desc 'Scrapes all the countries, states, and cities from Craigslist'
namespace :scrape do
  task locations: :environment do
    CraigslistService::ScrapeLocations.retrieve
  end
end
