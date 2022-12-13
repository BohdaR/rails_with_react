# frozen_string_literal: true

class CreateJoinTableRoomsIssues < ActiveRecord::Migration[7.0]
  def change
    create_join_table :issues, :rooms do |t|
      t.index :issue_id
      t.index :room_id
    end
  end
end
