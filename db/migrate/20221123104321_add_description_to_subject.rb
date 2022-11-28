# frozen_string_literal: true

class AddDescriptionToSubject < ActiveRecord::Migration[7.0]
  def change
    add_column :subjects, :description, :string
  end
end
