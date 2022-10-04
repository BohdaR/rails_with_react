# frozen_string_literal: true

class CreatePlaces < ActiveRecord::Migration[7.0]
  def change
    create_table :places do |t|
      t.references :room, null: false, foreign_key: true
      t.integer :number

      t.timestamps
    end
  end
end
