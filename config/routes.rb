Rails.application.routes.draw do
  root 'welcome#index'

  devise_for :users, skip: [:sessions]
  as :user do
    get 'login', to: 'devise/sessions#new'
    post 'login', to: 'devise/sessions#create'
    delete 'logout', to: 'devise/sessions#destroy'
  end

  get 'dashboard/index', as: :my_dashboard
end
