class RenameLinkColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :listings, :link, :url
  end
end
