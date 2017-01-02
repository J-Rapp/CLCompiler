class SearchesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:execute]

  def new
    @search = Search.new(user_id: current_user.id)
    @areas = Area.all
    @regions = Region.all
  end

  def create
    @search = Search.new(search_params)
    if @search.save
      SearchesService.new.call(current_user.id)
      redirect_to search_path(@search)
    else
      # TODO: Build this out more
      flash[:error] = 'Oops, please try again.'
      @areas = Area.all
      @regions = Region.all
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

  def execute
    SearchesService.new.call
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
