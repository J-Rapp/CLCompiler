desc 'Scrapes all the regions, districts, and areas from Craigslist'
namespace :craigslist do
  task search: :environment do
    SearchesService.new.send
  end
end
