# frozen_string_literal: true

class AddAccessTokenToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :access_token, :string
    add_column :users, :expires_at, :datetime
    add_column :users, :refresh_token, :string
  end
end
