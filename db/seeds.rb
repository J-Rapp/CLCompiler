# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create!(
  username: 'Captain Fantastic',
  email: 'meg@list.com',
  password: 'password'
)
puts 'Created default user. Email: \'user@list.com\', Password: \'password\'.'

puts 'Scraping and persisting all Craigslist locations...'
LocationsService.new.call

search = Search.create!(
  name: 'School Bus Conversion',
  includes: 'school bus',
  excludes: 'vw',
  min_price: '200',
  max_price: '10000',
  refresh_interval: 'hourly',
  user_id: user.id
)
puts 'Created default hourly search.'

search.area_ids = [392, 2, 5, 26, 94]
puts 'Associated search\'s areas...'

puts 'Scraping and persisting search\'s current listings...'
SearchesService.new.call

puts 'Seeding complete.'
