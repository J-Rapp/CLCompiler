class RemoveLocationsFromSearches < ActiveRecord::Migration[5.0]
  def change
    remove_column :searches, :locations
  end
end
