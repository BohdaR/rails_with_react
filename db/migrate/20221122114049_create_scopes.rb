# frozen_string_literal: true

class CreateScopes < ActiveRecord::Migration[7.0]
  def change
    create_table :scopes do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
