class CreateCitiesSearches < ActiveRecord::Migration[5.0]
  def change
    create_table :cities_searches do |t|
      t.references :city,   index: true
      t.references :search, index: true

      t.timestamps null: false
    end
  end
end
