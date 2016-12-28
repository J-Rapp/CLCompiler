desc 'Scrapes all the regions, districts, and areas from Craigslist'
namespace :craigslist do
  task locations: :environment do
    LocationsService.new.call
  end
end
