# frozen_string_literal: true

class AddCompanyToRooms < ActiveRecord::Migration[7.0]
  def change
    add_reference :rooms, :company, null: false, foreign_key: true
  end
end
