Rails.application.routes.draw do
  root 'welcome#index'

  devise_for :users
  as :user do
    get 'login', to: 'devise/sessions#new'
    post 'login', to: 'devise/sessions#create'
    delete 'logout', to: 'devise/sessions#destroy'
    get 'register', to: 'devise/registrations#new'
    get 'dashboard', to: 'dashboard#index', as: :user_root
  end

  resources :searches, only: [:new, :create, :show, :destroy]
  resources :results, only: [:update]

  get 'dashboard', to: 'dashboard#index'
  get 'searches/execute', to: 'searches#execute'
end
