class RemoveUnnecessaryIndexes < ActiveRecord::Migration[5.0]
  def change
    remove_reference :areas,    :areas_searches, index: true
    remove_reference :searches, :areas_searches, index: true
  end
end
