class RemoveLocationReferences < ActiveRecord::Migration[5.0]
  def change
    remove_reference :states,          :country,         index: false
    remove_reference :cities,          :state,           index: false
    remove_reference :cities,          :cities_searches, index: false
    remove_reference :cities_searches, :city,            index: false
    remove_reference :searches,        :cities_searches, index: false
  end
end
