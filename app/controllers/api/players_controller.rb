class Api::PlayersController < ApplicationController
  def create
    @player = Player.new(player_params)
    if @player.save
      redirect_to :action => 'index' 
    else
      render json: { errors: @player.errors.full_messages }
    end
  end

  def index
    @players = Player.includes(:won_games,:lost_games).order(rating: :desc)
  end

  def show
    @player = Player.find(params[:id])
  end

  def player_params
    params.require(:player).permit(:id, :name, :description)
  end

end
