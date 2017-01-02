class AlterListingPriceColumn < ActiveRecord::Migration[5.0]
  def change
    change_column :listings, :price, :string, default: '$0'
  end
end
