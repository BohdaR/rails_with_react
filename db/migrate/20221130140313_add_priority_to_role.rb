class AddPriorityToRole < ActiveRecord::Migration[7.0]
  def change
    add_column :roles, :priority, :integer
  end
end
