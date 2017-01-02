class AlterListingsPriceColumn < ActiveRecord::Migration[5.0]
  def change
    change_column_null :listings, :price, false
  end
end
