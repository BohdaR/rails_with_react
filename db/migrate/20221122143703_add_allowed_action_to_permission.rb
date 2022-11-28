# frozen_string_literal: true

class AddAllowedActionToPermission < ActiveRecord::Migration[7.0]
  def change
    add_reference :permissions, :allowed_action, null: false, foreign_key: true
  end
end
