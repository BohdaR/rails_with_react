# frozen_string_literal: true

class CreateJoinTableAllowedActionPermission < ActiveRecord::Migration[7.0]
  def change
    create_join_table :allowed_actions, :permissions do |t|
      t.index :allowed_action_id
      t.index :permission_id
    end
  end
end
