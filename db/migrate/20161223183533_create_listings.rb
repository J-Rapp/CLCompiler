class CreateListings < ActiveRecord::Migration[5.0]
  def change
    create_table :listings do |t|
      t.string     :title,    null: false
      t.string     :link,     null: false
      t.string     :price,    null: false
      t.string     :location, null: false
      t.boolean    :favorite
      t.references :search,   index: true

      t.timestamps
    end
  end
end
