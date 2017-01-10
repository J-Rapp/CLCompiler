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
      SearchesService.new.call(search: @search)
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
    if user_is_owner?(@search)
      @areas = @search.areas
      @results = @search.results.unfavorited.includes(:listing)
      @favorited_results = @search.results.favorited.includes(:listing)
    else
      redirect_to dashboard_path
    end
  end

  def destroy
    search = Search.find(params[:id])
    search.destroy! if user_is_owner?(search)
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

  def user_is_owner?(search)
    current_user.id == search.user_id
  end
end
