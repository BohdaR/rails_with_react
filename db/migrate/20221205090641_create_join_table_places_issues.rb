# frozen_string_literal: true

class CreateJoinTablePlacesIssues < ActiveRecord::Migration[7.0]
  def change
    create_join_table :issues, :places do |t|
      t.index :issue_id
      t.index :place_id
    end
  end
end
