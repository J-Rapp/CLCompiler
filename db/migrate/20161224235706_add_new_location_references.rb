class AddNewLocationReferences < ActiveRecord::Migration[5.0]
  def change
    add_reference :districts,      :region,         index: true
    add_reference :areas,          :district,       index: true
    add_reference :areas,          :areas_searches, index: true
    add_reference :areas_searches, :area,           index: true
    add_reference :searches,       :areas_searches, index: true
  end
end
