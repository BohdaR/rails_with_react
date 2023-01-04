# frozen_string_literal: true

class AddSlackIdToEmployee < ActiveRecord::Migration[7.0]
  def change
    add_column :employees, :slack_id, :string
  end
end
