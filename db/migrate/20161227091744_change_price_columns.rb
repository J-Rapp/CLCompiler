class ChangePriceColumns < ActiveRecord::Migration[5.0]
  def change
    change_column :searches, :price_min, :string
    rename_column :searches, :price_min, :min_price
    change_column :searches, :price_max, :string
    rename_column :searches, :price_max, :max_price
  end
end
