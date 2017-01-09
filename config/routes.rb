Rails.application.routes.draw do
  get '/' => redirect('/dashboard')
  get 'welcome', to: 'welcome#index'
  get 'dashboard', to: 'dashboard#index'
  get 'dashboard', to: 'dashboard#index', as: :user_root
  get 'users/sign_in' => redirect('/welcome')
  get 'searches/execute', to: 'searches#execute'

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
