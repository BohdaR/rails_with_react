Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :reservations
  resources :offices
  resources :rooms do
    resources :places
  end
  devise_for :user,
     controllers: {
       omniauth_callbacks: 'users/omniauth_callbacks'
     }

  root 'pages#index'
end
