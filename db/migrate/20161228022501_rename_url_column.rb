class RenameUrlColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :areas, :url, :subdomain
  end
end
