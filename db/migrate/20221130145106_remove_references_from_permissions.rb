class RemoveReferencesFromPermissions < ActiveRecord::Migration[7.0]
  def change
    remove_reference :permissions, :allowed_action
  end
end
