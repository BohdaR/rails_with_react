# frozen_string_literal: true

class CreateEmployeeSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :employee_settings do |t|
      t.boolean :slack_notifications
      t.boolean :email_notifications, default: true
      t.references :employee, null: false, foreign_key: true

      t.timestamps
    end
  end
end
