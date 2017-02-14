class WelcomeController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @regions = Region.all
    @districts = District.all
    @areas = Area.all
  end

  def search
    render json: Craigslist.search(params[:subdomains], search_params)
  end

  def entry
  end

  def check_user
    user = User.where(email: params[:email])
    if user.exists?
      render json: {}, status: :found
    else
      render json: {}, status: :ok
    end
  end

  private

  def search_params
    params.require(:search).permit(:includes, :excludes, :min_price, :max_price)
  end
end
