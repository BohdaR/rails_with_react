# frozen_string_literal: true

class AddCoordsToPlace < ActiveRecord::Migration[7.0]
  def change
    add_column :places, :x, :float
    add_column :places, :y, :float
  end
end
