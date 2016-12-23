class CreateSearches < ActiveRecord::Migration[5.0]
  def change
    create_table :searches do |t|
      t.string     :name,             null: false
      t.text       :locations,        null: false
      t.string     :includes,         null: false
      t.string     :excludes
      t.integer    :price_min
      t.integer    :price_max
      t.integer    :refresh_interval, null: false
      t.references :user, index: true

      t.timestamps
    end
  end
end
