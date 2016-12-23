Rails.application.routes.draw do
  root 'welcome#index'

  devise_for :users
  as :user do
    get 'login', to: 'devise/sessions#new'
    post 'login', to: 'devise/sessions#create'
    delete 'logout', to: 'devise/sessions#destroy'
    get 'register', to: 'devise/registrations#new'
  end

  get 'dashboard', to: 'dashboard#index'
end
