class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name, null: false
      t.text :description, default: ""
      t.integer :rating, default: 1000

      t.timestamps null: false
    end
  end
end
