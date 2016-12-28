desc 'Executes all readied searches'
namespace :craigslist do
  task search: :environment do
    SearchesService.new.send
  end
end
