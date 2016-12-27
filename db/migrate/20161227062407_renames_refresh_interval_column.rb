class RenamesRefreshIntervalColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :searches, :refresh_interval, :refresh_interval_key
  end
end
