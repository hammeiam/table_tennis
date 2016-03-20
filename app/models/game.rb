class Game < ActiveRecord::Base
  belongs_to :winner, class_name: 'Player'
  belongs_to :loser, class_name: 'Player'
  after_create :calc_player_scores
  
  K_FACTOR = 32

  def calc_player_scores
    p1 = Player.find(self.winner_id)
    p2 = Player.find(self.loser_id)

    p1_prob_win = (1/(1 + 10**((p2.rating - p1.rating)/400.0))).round(2) 
    p2_prob_win = (1/(1 + 10**((p1.rating - p2.rating)/400.0))).round(2) 

    p1_new_score = (p1.rating + (K_FACTOR * (1 - p1_prob_win))).round # 1 bc victory
    p2_new_score = (p2.rating + (K_FACTOR * (0 - p2_prob_win))).round # 0 bc loss
    
    Game.transaction do 
      p1.update(rating: p1_new_score)
      p2.update(rating: p2_new_score)
    end
  end

end
# http://guides.rubyonrails.org/active_record_callbacks.html#available-callbacks