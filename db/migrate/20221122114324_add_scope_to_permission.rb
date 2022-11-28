# frozen_string_literal: true

class AddScopeToPermission < ActiveRecord::Migration[7.0]
  def change
    add_reference :permissions, :scope, null: false, foreign_key: true
  end
end
