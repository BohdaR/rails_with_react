# frozen_string_literal: true

class CreateAuthGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :auth_groups do |t|
      t.string :name
      t.integer :priority

      t.timestamps
    end
  end
end
