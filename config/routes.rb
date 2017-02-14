Rails.application.routes.draw do
  root 'welcome#index'

  post 'search', to: 'welcome#search'
  get 'dashboard', to: 'dashboard#index', as: :user_root
  get 'enter', to: 'welcome#enter'
  get 'users/sign_in', to: redirect('enter')
  get 'searches/execute', to: 'searches#execute'
  get 'check_user', to: 'welcome#check_user'

  devise_for :users
  as :user do
    get 'login', to: 'devise/sessions#new'
    post 'login', to: 'devise/sessions#create'
    delete 'logout', to: 'devise/sessions#destroy'
    get 'register', to: 'devise/registrations#new'
  end

  resources :searches, only: [:new, :create, :show, :destroy]
  resources :results, only: [:update]
end
