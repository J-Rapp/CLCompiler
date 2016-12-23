class AddCitiesSearchesReferenceToSearches < ActiveRecord::Migration[5.0]
  def change
    add_reference :searches, :cities_searches, index: true
  end
end
