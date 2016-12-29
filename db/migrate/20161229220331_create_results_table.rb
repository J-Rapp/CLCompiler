class CreateResultsTable < ActiveRecord::Migration[5.0]
  def change
    create_table :results do |t|
      t.boolean :new,         default: true
      t.boolean :favorited,   default: false
      t.boolean :blacklisted, default: false

      t.references :searches, index: true
      t.references :listings, index: true

      t.timestamps
    end
  end
end
