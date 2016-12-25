class SearchesController < ApplicationController
  def new
    @search = Search.new(user_id: current_user.id)
    @areas = Area.all
  end

  def create
    @search = Search.create(search_params)
    if @search.id
      redirect_to search_path(@search)
    else
      # TODO: Build this out more
      flash[:error] = 'Oops, please try again.'
      render :new
    end
  end

  def show
    @search = Search.find(params[:id])
    @listings = @search.listings
  end

  private

  def search_params
    params.require(:search).permit :user_id,
                                   :name,
                                   :includes,
                                   :excludes,
                                   :price_min,
                                   :price_max,
                                   :refresh_interval
  end
end
