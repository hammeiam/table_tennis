json.(player, :id, :name, :description)
json.won_games player.won_games do |game|
  json.(game, :id, :winner_id, :loser_id)
end
json.lost_games player.lost_games do |game|
  json.(game, :id, :winner_id, :loser_id)
end