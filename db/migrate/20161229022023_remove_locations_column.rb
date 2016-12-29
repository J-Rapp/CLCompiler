class RemoveLocationsColumn < ActiveRecord::Migration[5.0]
  def change
    remove_column :listings, :location
  end
end
