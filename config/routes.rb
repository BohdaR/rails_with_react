Rails.application.routes.draw do
  resources :reservations
  resources :offices
  resources :rooms do
    resources :places
  end
  devise_for :user,
     controllers: {
       omniauth_callbacks: 'users/omniauth_callbacks'
     }
end
