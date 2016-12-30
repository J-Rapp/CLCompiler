class ResultsController < ApplicationController
  def update
    result = Result.find(params[:id])
    search = result.search
    update_result(result, result_params)
    redirect_to search_path(search)
  end

  private

  def result_params
    params.require(:result).permit(:visited, :blacklisted, :favorited)
  end

  def update_result(result, params)
    p params
    if params['visited']
      result.update_attributes!(visited: true)
    elsif params['blacklisted']
      result.update_attributes!(blacklisted: true)
    elsif params['favorited'] == 'true'
      result.update_attributes!(favorited: true)
    elsif params['favorited'] == 'false'
      result.update_attributes!(favorited: false, visited: true)
    end
  end
end
