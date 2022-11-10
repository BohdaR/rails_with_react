# frozen_string_literal: true

class AddDescriptionToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :description, :string
  end
end
