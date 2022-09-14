Rails.application.routes.draw do
  root 'booking#greeting'
  devise_for :user,
     controllers: {
       omniauth_callbacks: 'users/omniauth_callbacks'
     }
end
