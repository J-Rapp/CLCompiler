class CreateCities < ActiveRecord::Migration[5.0]
  def change
    create_table :cities do |t|
      t.string     :name,            null: false
      t.references :state,           index: true
      t.references :cities_searches, index: true

      t.timestamps null: false
    end
  end
end
