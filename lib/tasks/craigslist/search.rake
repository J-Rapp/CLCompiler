desc 'Executes all readied searches'
namespace :craigslist do
  task search: :environment do
    SearchesService.new.call
  end
end
