class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.references :office, null: false, foreign_key: true
      t.integer :floor
      t.string :name

      t.timestamps
    end
  end
end
