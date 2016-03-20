class PlayersController < ApplicationController
  def create
    @player = Player.new(player_params)
    if @player.save
      render json: { success: 'great fucking job' }
    else
      render json: { errors: @player.errors.full_messages }
    end
  end

  def index
    @players = Player.all.sort(rating: :desc)
  end

  def show
    @player = Player.find(params[:id])
  end

  def player_params
    params.permit(:id, :name, :description)
  end

end
