Rails.application.routes.draw do
  root 'welcome#index'

  post 'search', to: 'welcome#search'
  get 'dashboard', to: 'dashboard#index', as: :user_root
  get 'entry', to: 'welcome#entry'
  get 'users/sign_in', to: redirect('entry')
  get 'searches/execute', to: 'searches#execute'
  get 'check_user', to: 'welcome#check_user'

  devise_for :users
  as :user do
    get 'login', to: 'devise/sessions#new'
    delete 'logout', to: 'devise/sessions#destroy'
  end

  resources :searches, only: [:new, :create, :show, :destroy]
  resources :results, only: [:update]
end
