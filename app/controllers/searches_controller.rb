class SearchesController < ApplicationController
  def new
    @search = Search.new(user_id: current_user.id)
    @areas = Area.all
    @regions = Region.all
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
    @areas = @search.areas
    @results = @search.results.unfavorited.includes(:listing)
    @favorited_results = @search.results.favorited.includes(:listing)
  end

  def destroy
    search = Search.find(params[:id])
    search.destroy!
    redirect_to dashboard_path
  end

  private

  def search_params
    params.require(:search).permit :user_id,
                                   :name,
                                   :includes,
                                   :excludes,
                                   :min_price,
                                   :max_price,
                                   :refresh_interval,
                                   area_ids: []
  end
end
