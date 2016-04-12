class Player < ActiveRecord::Base
  has_many :won_games, foreign_key: "winner_id", class_name: "Game"
  has_many :lost_games, foreign_key: "loser_id", class_name: "Game"

  validates :name, uniqueness: { case_sensitive: false }

  def player_record
    output = Hash.new {|h,k| h[k] = {won: 0, lost: 0}}
    won_games.each do |game|
      output[game.loser_id][:won] += 1
    end
    lost_games.each do |game|
      output[game.winner_id][:lost] += 1
    end
    output
  end
end
