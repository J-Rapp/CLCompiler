class CreateResultsTable < ActiveRecord::Migration[5.0]
  def change
    create_table :results do |t|
      t.boolean :visited,     default: false
      t.boolean :favorited,   default: false
      t.boolean :blacklisted, default: false

      t.references :search,  index: true
      t.references :listing, index: true

      t.timestamps
    end
  end
end
