# frozen_string_literal: true

class ChangeUserIdNullForEmployees < ActiveRecord::Migration[7.0]
  def change
    change_column_null :employees, :user_id, true
  end
end
