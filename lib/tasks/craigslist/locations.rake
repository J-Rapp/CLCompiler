desc 'Scrapes all the regions, districts, and areas from Craigslist'
namespace :craigslist do
  task locations: :environment do
    locations = CraigslistParser::RetrieveLocations.new.parse
    CraigslistService::LocationsService.new.persist(locations)
  end
end
