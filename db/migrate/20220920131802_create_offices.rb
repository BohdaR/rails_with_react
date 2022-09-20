class CreateOffices < ActiveRecord::Migration[7.0]
  def change
    create_table :offices do |t|
      t.references :company, null: false, foreign_key: true
      t.string :street
      t.string :house_number
      t.string :town
      t.string :province
      t.string :country

      t.timestamps
    end
  end
end
