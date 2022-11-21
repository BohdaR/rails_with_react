# frozen_string_literal: true

class CreateJoinTableEmployeesRoles < ActiveRecord::Migration[7.0]
  def change
    create_join_table :employees, :roles do |t|
      t.index :employee_id
      t.index :role_id
    end
  end
end
