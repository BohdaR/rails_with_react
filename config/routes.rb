Rails.application.routes.draw do
  resources :reservations
  resources :rooms do
    resources :places
  end
  root 'home#index'
  devise_for :user,
     controllers: {
       omniauth_callbacks: 'users/omniauth_callbacks'
     }
end
