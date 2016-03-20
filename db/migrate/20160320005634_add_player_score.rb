class AddPlayerScore < ActiveRecord::Migration
  def change
    add_column :players, :rating, :integer, default: 1000
  end
end
