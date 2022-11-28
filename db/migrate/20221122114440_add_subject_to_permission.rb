# frozen_string_literal: true

class AddSubjectToPermission < ActiveRecord::Migration[7.0]
  def change
    add_reference :permissions, :subject, null: false, foreign_key: true
  end
end
