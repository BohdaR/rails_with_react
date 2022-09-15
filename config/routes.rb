Rails.application.routes.draw do
  root 'booking#index'
  devise_for :user,
     controllers: {
       omniauth_callbacks: 'users/omniauth_callbacks'
     }
end
