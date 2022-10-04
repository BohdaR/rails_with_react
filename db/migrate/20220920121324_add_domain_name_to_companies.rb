# frozen_string_literal: true

class AddDomainNameToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :domain_name, :string
    add_index :companies, :domain_name
  end
end
