class ChangeLocationTablesNames < ActiveRecord::Migration[5.0]
  def change
    rename_table :countries,       :regions
    rename_table :states,          :districts
    rename_table :cities,          :areas
    rename_table :cities_searches, :areas_searches
  end
end
