class GamesController < ApplicationController
  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to :controller => 'players', :action => 'index' 
    else
      render json: { errors: @game.errors.full_messages }
    end
  end

  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:id, :winner_id, :loser_id)
  end
end
