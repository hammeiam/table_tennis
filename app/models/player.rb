class Player < ActiveRecord::Base
  has_many :won_games, foreign_key: "winner_id", class_name: "Game"
  has_many :lost_games, foreign_key: "loser_id", class_name: "Game"

end
