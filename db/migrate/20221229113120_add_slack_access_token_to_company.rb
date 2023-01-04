# frozen_string_literal: true

class AddSlackAccessTokenToCompany < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :slack_access_token, :string
  end
end
