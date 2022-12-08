# frozen_string_literal: true

class AddCalendarIdToReservations < ActiveRecord::Migration[7.0]
  def change
    add_column :reservations, :calendar_id, :string
    add_column :reservations, :calendar_link, :string
  end
end
