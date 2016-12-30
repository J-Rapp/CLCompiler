class ChangeVisitedColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :results, :visited, :delivered
  end
end
